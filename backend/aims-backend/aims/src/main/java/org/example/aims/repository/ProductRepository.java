package org.example.aims.repository;

import jakarta.transaction.Transactional;
import org.example.aims.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO product (title, price, category, image_url, quantity, entry_date, dimension, weight, seller_id) Values (:title, :price, :category, :imageUrl, :quantity, :entryDate, :dimension, :weight, :sellerId)", nativeQuery = true)
    void CustomInsert(
            @Param("title") String title,
            @Param("price") int price,
            @Param("category") String category,
            @Param("imageUrl") String imageUrl,
            @Param("quantity") int quantity,
            @Param("entryDate") LocalDate entryDate,
            @Param("dimension") double dimension,
            @Param("weight") double weight,
            @Param("sellerId") int sellerId
    );
    List<Product> findByTitleContaining(String title);
}
