package org.example.aims.controller;

import org.example.aims.entities.TransactionInfo;
import org.example.aims.response.ResponseObject;
import lombok.RequiredArgsConstructor;
import org.example.aims.service.interfaces.TransactionService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @GetMapping("/order/{orderId}")
    public ResponseObject<List<TransactionInfo>> getTransactionsByOrderId(@PathVariable int orderId) {
        List<TransactionInfo> transactions = transactionService.getTransactionsByOrderId(orderId);
        if (transactions != null && !transactions.isEmpty()) {
            return new ResponseObject<>(HttpStatus.OK, "Success", transactions);
        } else {
            return new ResponseObject<>(HttpStatus.NOT_FOUND, "No transactions found for orderId: " + orderId, null);
        }
    }
}