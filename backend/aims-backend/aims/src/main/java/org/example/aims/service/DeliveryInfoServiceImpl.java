// src/main/java/org/example/aims/service/impl/DeliveryInfoServiceImpl.java
package org.example.aims.service;

import org.example.aims.entities.DeliveryInfo;
import org.example.aims.repository.DeliveryInfoRepository;
import org.example.aims.service.interfaces.DeliveryInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeliveryInfoServiceImpl implements DeliveryInfoService {

    @Autowired
    private DeliveryInfoRepository deliveryInfoRepository;

    @Override
    public List<DeliveryInfo> getAllDeliveryInfos() {
        return deliveryInfoRepository.findAll();
    }

    @Override
    public Optional<DeliveryInfo> getDeliveryInfoById(int id) {
        return deliveryInfoRepository.findById(id);
    }

    @Override
    public DeliveryInfo addDeliveryInfo(DeliveryInfo deliveryInfo) {
        return deliveryInfoRepository.save(deliveryInfo);
    }

    @Override
    public DeliveryInfo updateDeliveryInfo(int id, DeliveryInfo deliveryInfo) {
        Optional<DeliveryInfo> existingDeliveryInfo = deliveryInfoRepository.findById(id);
        if (existingDeliveryInfo.isPresent()) {
            DeliveryInfo updatedDeliveryInfo = existingDeliveryInfo.get();
            updatedDeliveryInfo.setName(deliveryInfo.getName());
            updatedDeliveryInfo.setPhone(deliveryInfo.getPhone());
            updatedDeliveryInfo.setAddress(deliveryInfo.getAddress());
            updatedDeliveryInfo.setProvince(deliveryInfo.getProvince());
            updatedDeliveryInfo.setInstruction(deliveryInfo.getInstruction());
            updatedDeliveryInfo.setUserId(deliveryInfo.getUserId());
            return deliveryInfoRepository.save(updatedDeliveryInfo);
        }
        return null;
    }

    @Override
    public void deleteDeliveryInfo(int id) {
        deliveryInfoRepository.deleteById(id);
    }
    public Optional<DeliveryInfo> findByUserId(int userId) {
        return deliveryInfoRepository.findByUserId(userId);
    }

    @Override
    public List<DeliveryInfo> getAllDeliveryInfoByUserId(int userId) {
        return deliveryInfoRepository.findAll().stream()
                .filter(deliveryInfo -> deliveryInfo.getUserId() == userId)
                .toList();
    }
}
