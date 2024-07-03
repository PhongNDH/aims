// src/main/java/org/example/aims/service/DeliveryInfoService.java
package org.example.aims.service.interfaces;

import org.example.aims.entities.DeliveryInfo;

import java.util.List;
import java.util.Optional;

public interface DeliveryInfoService {
    List<DeliveryInfo> getAllDeliveryInfos();
    Optional<DeliveryInfo> getDeliveryInfoById(int id);
    DeliveryInfo addDeliveryInfo(DeliveryInfo deliveryInfo);
    DeliveryInfo updateDeliveryInfo(int id, DeliveryInfo deliveryInfo);
    void deleteDeliveryInfo(int id);
    Optional<DeliveryInfo> findByUserId(int userId);

    List<DeliveryInfo> getAllDeliveryInfoByUserId(int userId);

}
