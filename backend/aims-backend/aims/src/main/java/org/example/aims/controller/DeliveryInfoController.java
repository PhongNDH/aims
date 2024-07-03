// src/main/java/org/example/aims/controllers/DeliveryInfoController.java
package org.example.aims.controller;

import org.example.aims.entities.DeliveryInfo;
import org.example.aims.service.interfaces.DeliveryInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/delivery-info")
public class DeliveryInfoController {

    @Autowired
    private DeliveryInfoService deliveryInfoService;

    @GetMapping
    public List<DeliveryInfo> getAllDeliveryInfos() {
        return deliveryInfoService.getAllDeliveryInfos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeliveryInfo> getDeliveryInfoById(@PathVariable int id) {
        Optional<DeliveryInfo> deliveryInfo = deliveryInfoService.getDeliveryInfoById(id);
        return deliveryInfo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public DeliveryInfo addDeliveryInfo(@RequestBody DeliveryInfo deliveryInfo) {
        return deliveryInfoService.addDeliveryInfo(deliveryInfo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DeliveryInfo> updateDeliveryInfo(@PathVariable int id, @RequestBody DeliveryInfo deliveryInfo) {
        DeliveryInfo updatedDeliveryInfo = deliveryInfoService.updateDeliveryInfo(id, deliveryInfo);
        if (updatedDeliveryInfo != null) {
            return ResponseEntity.ok(updatedDeliveryInfo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDeliveryInfo(@PathVariable int id) {
        deliveryInfoService.deleteDeliveryInfo(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/user/{userId}")
    public List<DeliveryInfo> getDeliveryInfoByUserId(@PathVariable int userId) {
        return deliveryInfoService.getAllDeliveryInfoByUserId(userId);
    }
}
