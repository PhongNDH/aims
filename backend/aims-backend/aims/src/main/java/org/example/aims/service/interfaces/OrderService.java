package org.example.aims.service.interfaces;

import org.example.aims.dtos.ManagerOrderDto;
import org.example.aims.dtos.OrderDto;
import org.example.aims.entities.Orders;
import java.util.List;

public interface OrderService {
    Orders createRegularOrder(List<Integer> orderProductIds, int userId);
    Orders createRegularOrderWithDeliveryId(List<Integer> orderProductIds, int deliveryId);
    Orders createExpressOrder(List<Integer> orderProductIds, int deliveryId);
    List<Orders> getAllOrders();
    List<OrderDto> getOrdersByUserId(int userId);
    List<ManagerOrderDto> getOrdersBySellerId(int userId);
    Orders updateOrderStatus(int id);
}

