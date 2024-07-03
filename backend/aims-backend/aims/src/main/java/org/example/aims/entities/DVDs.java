package org.example.aims.entities;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@Entity
@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder(builderMethodName = "dvdBuilder")
@Table(name = "dvds")
public class DVDs extends Product {
    int id;
    String discType;
    int runtime;
    String director;
    String studio;
    String language;
    String subtitles;
    LocalDate releaseDate;

    public DVDs(int id, String title, int price, String category, String imageUrl, int quantity, LocalDate entryDate, double dimension, double weight, int sellerId, String discType, int runtime, String studio, String language, String subtitles, LocalDate releaseDate) {
        super(id, title, price, category, imageUrl, quantity, entryDate, dimension, weight, sellerId);
        this.id = super.getId();
        this.discType = discType;
        this.runtime = runtime;
        this.studio = studio;
        this.language = language;
        this.subtitles = subtitles;
        this.releaseDate = releaseDate;
    }
}
