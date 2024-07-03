package org.example.aims.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.aims.entities.DeliveryInfo;
import org.example.aims.entities.OrderProduct;
import org.example.aims.entities.Product;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDto {
    int id;
    double shippingFees;
    double totalAmount;
    LocalDate placedDate;
    LocalTime createdAt;
    int VAT;
    double totalFee;
    LocalTime startTime;
    LocalTime endTime;
    boolean isPayment;
    DeliveryInfo delivery;
    List<Product> products;

}
