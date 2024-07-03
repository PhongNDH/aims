package org.example.aims.service;

import org.example.aims.config.VNPayConfig;
import org.example.aims.dtos.PaymentDTO;
import org.example.aims.entities.Orders;
import org.example.aims.repository.OrderRepository;
import org.example.aims.service.interfaces.PaymentService;
import org.example.aims.util.VNPayUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final VNPayConfig vnPayConfig;
    private final OrderRepository orderRepository;

    @Override
    public PaymentDTO.VNPayResponse createVnPayPayment(HttpServletRequest request) {
        long amount = Integer.parseInt(request.getParameter("amount")) * 100L;
        String bankCode = request.getParameter("bankCode");
        Map<String, String> vnpParamsMap = vnPayConfig.getVNPayConfig(0);
        vnpParamsMap.put("vnp_Amount", String.valueOf(amount));
        if (bankCode != null && !bankCode.isEmpty()) {
            vnpParamsMap.put("vnp_BankCode", bankCode);
        }
        vnpParamsMap.put("vnp_IpAddr", VNPayUtil.getIpAddress(request));
        //build query url
        String queryUrl = VNPayUtil.getPaymentURL(vnpParamsMap, true);
        String hashData = VNPayUtil.getPaymentURL(vnpParamsMap, false);
        String vnpSecureHash = VNPayUtil.hmacSHA512(vnPayConfig.getSecretKey(), hashData);
        queryUrl += "&vnp_SecureHash=" + vnpSecureHash;
        String paymentUrl = vnPayConfig.getVnp_PayUrl() + "?" + queryUrl;
        return PaymentDTO.VNPayResponse.builder()
                .code("ok")
                .message("success")
                .paymentUrl(paymentUrl).build();
    }

    @Override
    public PaymentDTO.VNPayResponse createVnPayPaymentForOrder(HttpServletRequest request, int orderId) {
        Optional<Orders> orderOpt = orderRepository.findById(orderId);
        if (orderOpt.isPresent()) {
            Orders order = orderOpt.get();
            long amount = (long) (order.getTotalFee() * 100L); // Assuming order amount is in smallest currency unit (e.g., cents)
            String bankCode = request.getParameter("bankCode");
            Map<String, String> vnpParamsMap = vnPayConfig.getVNPayConfig(orderId);
            vnpParamsMap.put("vnp_Amount", String.valueOf(amount));
            if (bankCode != null && !bankCode.isEmpty()) {
                vnpParamsMap.put("vnp_BankCode", bankCode);
            }
            vnpParamsMap.put("vnp_IpAddr", VNPayUtil.getIpAddress(request));
            // Build query URL
            String queryUrl = VNPayUtil.getPaymentURL(vnpParamsMap, true);
            String hashData = VNPayUtil.getPaymentURL(vnpParamsMap, false);
            String vnpSecureHash = VNPayUtil.hmacSHA512(vnPayConfig.getSecretKey(), hashData);
            queryUrl += "&vnp_SecureHash=" + vnpSecureHash;
            String paymentUrl = vnPayConfig.getVnp_PayUrl() + "?" + queryUrl;

            return PaymentDTO.VNPayResponse.builder()
                    .code("ok")
                    .message("success")
                    .paymentUrl(paymentUrl).build();
        } else {
            // Handle the case where order is not found
            return PaymentDTO.VNPayResponse.builder()
                    .code("error")
                    .message("Order not found")
                    .paymentUrl("").build();
        }
    }
}

