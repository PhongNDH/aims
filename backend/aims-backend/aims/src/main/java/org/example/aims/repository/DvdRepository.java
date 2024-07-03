package org.example.aims.repository;

import org.example.aims.entities.DVDs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface DvdRepository extends JpaRepository<DVDs, Integer> {
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO dvds (id, disc_type, director, runtime, studio, language, subtitles, release_date) VALUES (:id, :discType, :director,:runtime, :studio, :language, :subtitles, :releaseDate)", nativeQuery = true)
    void customInsert(@Param("id") int id,
                             @Param("discType") String discType,
                             @Param("director") String director,
                             @Param("runtime") int runtime,
                             @Param("studio") String studio,
                             @Param("language") String language,
                             @Param("subtitles") String subtitles,
                             @Param("releaseDate") String releaseDate);

    List<DVDs> findByTitleContaining(String title);
}
