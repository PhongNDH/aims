package org.example.aims.repository;

import org.example.aims.entities.CDLPs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CdlpRepository extends JpaRepository<CDLPs, Integer> {
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO cdlps (id, artist, record_label, track_list) VALUES (:id, :artist, :recordLabel, :trackList)", nativeQuery = true)
    void customInsert(
            @Param("id") int id,
            @Param("artist") String artist,
            @Param("recordLabel") String recordLabel,
            @Param("trackList" ) String trackList
    );

    List<CDLPs> findByTitleContaining(String title);
}
