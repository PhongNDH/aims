package org.example.aims.controller;

import org.example.aims.dtos.ManagerOrderDto;
import org.example.aims.dtos.OrderDto;
import org.example.aims.entities.Orders;
import org.example.aims.entities.User;
import org.example.aims.service.interfaces.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<List<Orders>> getAllOrders() {
        List<Orders> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<OrderDto>> getOrdersByUserId(@PathVariable int id) {
        List<OrderDto> orders = orderService.getOrdersByUserId(id);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/manager/{id}")
    public ResponseEntity<List<ManagerOrderDto>> getOrdersBySellerId(@PathVariable int id) {
        List<ManagerOrderDto> orders = orderService.getOrdersBySellerId(id);
        return ResponseEntity.ok(orders);
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<Orders> changeUserRole(@PathVariable int id) {

        Orders updatedOrder = orderService.updateOrderStatus(id);
        if(updatedOrder != null)
            return ResponseEntity.ok(updatedOrder);
        else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot update order status");
    }

    @PostMapping("/create")
    public ResponseEntity<Orders> createRegularOrder(@RequestParam List<Integer> orderProductIds, @RequestParam int userId) {
        Orders order = orderService.createRegularOrder(orderProductIds, userId);
        return ResponseEntity.ok(order);
    }
    @PostMapping("/create-by-delivery-id")
    public ResponseEntity<Orders> createRegularOrderWithDeliveryId(@RequestParam List<Integer> orderProductIds, @RequestParam int deliveryId) {
        Orders order = orderService.createRegularOrderWithDeliveryId(orderProductIds, deliveryId);
        return ResponseEntity.ok(order);
    }
    @PostMapping("/create-express-order")
    public ResponseEntity<Orders> createExpressOrder(@RequestParam List<Integer> orderProductIds, @RequestParam int deliveryId) {
        Orders order = orderService.createExpressOrder(orderProductIds, deliveryId);
        return ResponseEntity.ok(order);
    }
}
