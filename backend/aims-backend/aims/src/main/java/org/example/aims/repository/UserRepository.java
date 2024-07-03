package org.example.aims.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.example.aims.entities.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@EnableJpaRepositories
@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
//    @Modifying
//    @Transactional
//    @Query(value = "INSERT INTO user (id, username, email, role) VALUES (:id, :username, :email, :role)", nativeQuery = true)
//    void customInsert(
//            @Param("id") int id,
//            @Param("username") String username,
//            @Param("email") String email,
//            @Param("role") String role
//    );
    User findByUsername(String username);

    Boolean existsByUsername(String username);
//    User findByEmail(String email);
//    User getByEmail(String email);
}
