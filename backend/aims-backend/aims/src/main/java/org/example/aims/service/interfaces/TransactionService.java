package org.example.aims.service.interfaces;

import org.example.aims.entities.TransactionInfo;

import java.util.List;

public interface TransactionService {
    public void createTransaction(int orderId, String status);
    List<TransactionInfo> getTransactionsByOrderId(int orderId);
}
