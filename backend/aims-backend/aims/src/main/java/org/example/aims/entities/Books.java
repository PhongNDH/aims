package org.example.aims.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@Setter
@Getter
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder(builderMethodName = "bookBuilder")
@Table(name = "books")
public class Books extends Product {
    int id;
    String author;
    String publisher;
    String coverType;
    LocalDate publicationDate;
    int pages;
    String language;

    public Books(int id, String title, int price, String category, String imageUrl, int quantity, LocalDate entryDate, double dimension, double weight, int sellerId, String author, String coverType, String publisher, LocalDate publicationDate, int pages, String language) {
        super(id, title, price, category, imageUrl, quantity, entryDate, dimension, weight,sellerId);
        this.id = id;
        this.author = author;
        this.coverType = coverType;
        this.publisher = publisher;
        this.publicationDate = publicationDate;
        this.pages = pages;
        this.language = language;
    }

}
