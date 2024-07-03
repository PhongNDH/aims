package org.example.aims.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Setter
@Getter
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "transaction_info")
public class TransactionInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    int orderId;
    double totalAmount;
    String status;
    String paymentMethod;
    LocalTime time;
    LocalDate date;
    String content;


    public TransactionInfo(int orderId, double totalAmount, String paymentMethod, String status, LocalTime time, LocalDate date) {
        this.orderId = orderId;
        this.totalAmount = totalAmount;
        this.paymentMethod = paymentMethod;
        this.status = status;
        this.time = time;
        this.date = date;
    }

    public TransactionInfo(int id, double totalAmount, int orderId, String status, String paymentMethod, LocalTime time, LocalDate date, String content) {
        this.id = id;
        this.totalAmount = totalAmount;
        this.orderId = orderId;
        this.status = status;
        this.paymentMethod = paymentMethod;
        this.time = time;
        this.date = date;
        this.content = content;
    }


}
