package org.example.aims.repository;

import org.example.aims.entities.TransactionInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionInfoRepository extends JpaRepository<TransactionInfo, Integer> {
    List<TransactionInfo> findByOrderId(int orderId);

}
