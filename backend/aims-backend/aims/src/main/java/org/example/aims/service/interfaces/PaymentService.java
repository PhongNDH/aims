package org.example.aims.service.interfaces;

import org.example.aims.dtos.PaymentDTO;
import jakarta.servlet.http.HttpServletRequest;

public interface PaymentService {
    PaymentDTO.VNPayResponse createVnPayPayment(HttpServletRequest request);
    PaymentDTO.VNPayResponse createVnPayPaymentForOrder(HttpServletRequest request, int orderId);
}
