// src/main/java/org/example/aims/service/CartService.java
package org.example.aims.service.interfaces;

import org.example.aims.entities.OrderProduct;

import java.util.List;
import java.util.Optional;

public interface CartService {
    List<OrderProduct> getAllOrderProducts();
    Optional<OrderProduct> getOrderProductById(int id);
    OrderProduct addOrderProduct(OrderProduct orderProduct);
    List<OrderProduct> addOrderProducts(List<OrderProduct> orderProducts);
    OrderProduct updateOrderProduct(int id, OrderProduct orderProduct);

    String updateOrderProductId(List<Integer> orderProductIds, int id);
    void deleteOrderProduct(int id);
}
