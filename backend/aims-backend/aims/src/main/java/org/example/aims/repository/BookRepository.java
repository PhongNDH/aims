package org.example.aims.repository;

import jakarta.transaction.Transactional;
import org.example.aims.entities.Books;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface BookRepository extends JpaRepository<Books, Integer> {
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO books (id, author, publisher, cover_type, publication_date, pages, language) VALUES (:id, :author, :publisher, :coverType, :publicationDate, :pages, :language)", nativeQuery = true)
    void customInsert(
            @Param("id") int id,
            @Param("author") String author,
            @Param("publisher") String publisher,
            @Param("coverType") String coverType,
            @Param("publicationDate") LocalDate publicationDate,
            @Param("pages") int pages,
            @Param("language") String language
    );

    List<Books> findByTitleContaining(String title);
}
