package org.example.aims.repository;

import org.example.aims.entities.DeliveryInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface DeliveryInfoRepository extends JpaRepository<DeliveryInfo, Integer> {
    Optional<DeliveryInfo> findByUserId(int userId);

}
