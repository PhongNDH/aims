// src/main/java/org/example/aims/service/impl/CartServiceImpl.java
package org.example.aims.service;

import org.example.aims.entities.OrderProduct;
import org.example.aims.entities.Product;
import org.example.aims.exception.ResourceNotFoundException;
import org.example.aims.repository.CartRepository;
import org.example.aims.repository.ProductRepository;
import org.example.aims.service.interfaces.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<OrderProduct> getAllOrderProducts() {
        return cartRepository.findAll();
    }

    @Override
    public Optional<OrderProduct> getOrderProductById(int id) {
        return cartRepository.findById(id);
    }

    @Override
    public OrderProduct addOrderProduct(OrderProduct orderProduct) {
        Optional<Product> productOpt = productRepository.findById(orderProduct.getProductId());
        if (productOpt.isPresent()) {
            Product product = productOpt.get();
            orderProduct.setPrice(product.getPrice() * orderProduct.getQuantity());
            return cartRepository.save(orderProduct);
        }
        return null;
    }

    @Override
    public List<OrderProduct> addOrderProducts(List<OrderProduct> orderProducts) {
        List<OrderProduct> returningOrderProducts = new ArrayList<>();
        for (OrderProduct orderProduct : orderProducts) {
            Optional<Product> productOpt = productRepository.findById(orderProduct.getProductId());
            if (productOpt.isPresent()) {
                Product product = productOpt.get();
                if(product.getQuantity() - orderProduct.getQuantity() < 0){
                    throw new ResponseStatusException(HttpStatus.INSUFFICIENT_STORAGE,"Please check your products quantity");
                }
            }
        }


        for (OrderProduct orderProduct : orderProducts) {
            Optional<Product> productOpt = productRepository.findById(orderProduct.getProductId());
            if (productOpt.isPresent()) {
                Product product = productOpt.get();
                orderProduct.setPrice(product.getPrice() * orderProduct.getQuantity());
                product.setQuantity(product.getQuantity() - orderProduct.getQuantity());
                productRepository.save(product);
                OrderProduct op =  cartRepository.save(orderProduct);
                returningOrderProducts.add(op);
            }
        }
        return returningOrderProducts;
//        return null;
    }

    @Override
    public OrderProduct updateOrderProduct(int id, OrderProduct orderProduct) {
        Optional<OrderProduct> existingOrderProductOpt = cartRepository.findById(id);
        if (existingOrderProductOpt.isPresent()) {
            OrderProduct existingOrderProduct = existingOrderProductOpt.get();
            Optional<Product> productOpt = productRepository.findById(orderProduct.getProductId());
            if (productOpt.isPresent()) {
                Product product = productOpt.get();
                existingOrderProduct.setQuantity(orderProduct.getQuantity());
                existingOrderProduct.setPrice(product.getPrice() * orderProduct.getQuantity());
                return cartRepository.save(existingOrderProduct);
            }
        }
        return null;
    }

    @Override
    public String updateOrderProductId(List<Integer> orderProductIds, int id) {
        cartRepository.updateUserIdByOrderProductIds(orderProductIds, id);
        return "Updated Order Product successfully";
    }

    @Override
    public void deleteOrderProduct(int id) {
        cartRepository.deleteById(id);
    }
}
