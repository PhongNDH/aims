package org.example.aims.entities;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder(builderMethodName = "orderBuilder")
@Table(name = "order_media")
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    double shippingFees;
    int deliveryInfoId;
    double totalAmount;
    int userId;
    LocalDate placedDate;
    LocalTime createdAt;
    int shippingMethodId;
    int VAT;
    double totalFee;
    LocalTime startTime;
    LocalTime endTime;
    boolean isPayment;

    public Orders(double shippingFees, int deliveryInfoId, double totalAmount, int userId, LocalDate placedDate, LocalTime createdAt, int shippingMethodId, int VAT, LocalTime startTime, LocalTime endTime, boolean isPayment) {
        this.shippingFees = shippingFees;
        this.deliveryInfoId = deliveryInfoId;
        this.totalAmount = totalAmount;
        this.userId = userId;
        this.placedDate = placedDate;
        this.createdAt = createdAt;
        this.shippingMethodId = shippingMethodId;
        this.VAT = (int) (totalAmount/10);
        this.totalFee = VAT + totalAmount + shippingFees;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isPayment = isPayment;
    }

}
