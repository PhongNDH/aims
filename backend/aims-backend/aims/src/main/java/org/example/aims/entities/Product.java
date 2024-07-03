package org.example.aims.entities;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "product")
@Inheritance(strategy = InheritanceType.JOINED)
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String title;
    int price;
    String category;
    String imageUrl;
    int quantity;
    LocalDate entryDate;
    double dimension;
    double weight;
    int sellerId;

    public Product(String title, int price, String category, String imageUrl, int quantity, LocalDate entryDate, double dimension, double weight, int sellerId) {
        this.title = title;
        this.price = price;
        this.category = category;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
        this.entryDate = entryDate;
        this.dimension = dimension;
        this.weight = weight;
        this.sellerId= sellerId;
    }
}