package org.example.aims.service;

import org.example.aims.entities.Orders;
import org.example.aims.entities.TransactionInfo;
import org.example.aims.repository.OrderRepository;
import org.example.aims.repository.TransactionInfoRepository;
import lombok.RequiredArgsConstructor;
import org.example.aims.service.interfaces.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final OrderRepository orderRepository;
    @Autowired
    private TransactionInfoRepository transactionInfoRepository;

    @Override
    public void createTransaction(int orderId, String status) {
        Optional<Orders> orderOpt = orderRepository.findById(orderId);
        if (orderOpt.isPresent()) {
            Orders order = orderOpt.get();
            double totalAmount = order.getTotalFee(); // assuming totalFee is in the smallest currency unit

            TransactionInfo transactionInfo = TransactionInfo.builder()
                    .orderId(orderId)
                    .totalAmount(totalAmount)
                    .status(status)
                    .paymentMethod("VNPay") // assuming VNPay is the payment method
                    .time(LocalTime.now())
                    .date(LocalDate.now())
                    .content("Payment for order " + orderId)
                    .build();

            transactionInfoRepository.save(transactionInfo);
        } else {
            // Handle the case where order is not found
            throw new IllegalArgumentException("Order not found with id: " + orderId);
        }
    }
    @Override
    public List<TransactionInfo> getTransactionsByOrderId(int orderId) {
        return transactionInfoRepository.findByOrderId(orderId);
    }
}
