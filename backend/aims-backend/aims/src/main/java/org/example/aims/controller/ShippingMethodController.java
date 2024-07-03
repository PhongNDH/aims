package org.example.aims.controller;

import org.example.aims.entities.Product;
import org.example.aims.entities.ShippingMethod;
import org.example.aims.service.ProductServiceImpl;
import org.example.aims.service.ShippingMethodServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/shipping-method")
public class ShippingMethodController {
    @Autowired
    private ShippingMethodServiceImpl shippingMethodService;

    @GetMapping()
    public List<ShippingMethod> getProductByTitleContaining() {
        return shippingMethodService.getShippingMethods();
    }
}
