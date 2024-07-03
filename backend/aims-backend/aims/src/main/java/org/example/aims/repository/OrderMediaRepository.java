package org.example.aims.repository;

import org.example.aims.entities.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderMediaRepository extends JpaRepository<Orders, Integer> {
}
