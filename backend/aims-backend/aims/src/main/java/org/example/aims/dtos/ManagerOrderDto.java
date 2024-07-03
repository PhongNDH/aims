package org.example.aims.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.aims.entities.DeliveryInfo;
import org.example.aims.entities.Product;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ManagerOrderDto {
    DeliveryInfo deliveryInfo;
    int quantity;
    Product product;
}
