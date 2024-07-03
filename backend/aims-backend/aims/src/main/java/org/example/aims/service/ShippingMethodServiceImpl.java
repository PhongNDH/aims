package org.example.aims.service;

import org.example.aims.entities.ShippingMethod;
import org.example.aims.repository.ShippingMethodRepository;
import org.example.aims.service.interfaces.ShippingMethodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShippingMethodServiceImpl implements ShippingMethodService {
    @Autowired
    ShippingMethodRepository shippingMethodRepository;

    @Override
    public List<ShippingMethod> getShippingMethods() {
        return shippingMethodRepository.findAll();
    }
}
