package org.example.aims.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@Getter
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder(builderMethodName = "cdlpBuilder")
@Table(name = "cdlps")
public class CDLPs extends Product {
    int id;
    String artist;
    String recordLabel;
    String trackList;

    public CDLPs(int id, String title, int price, String category, String imageUrl, int quantity, LocalDate entryDate, double dimension, double weight, String artist, String recordLabel, String trackList, int sellerId) {
        super(id, title, price, category, imageUrl, quantity, entryDate, dimension, weight, sellerId);
        this.id = id;
        this.artist = artist;
        this.recordLabel = recordLabel;
        this.trackList = trackList;
    }
}
