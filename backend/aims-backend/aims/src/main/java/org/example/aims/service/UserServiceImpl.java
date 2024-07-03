package org.example.aims.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.example.aims.entities.Orders;
import org.example.aims.entities.Product;
import org.example.aims.entities.User;
import org.example.aims.exception.ResourceNotFoundException;
import org.example.aims.repository.OrderRepository;
import org.example.aims.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.example.aims.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class UserServiceImpl {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productsRepository;

    public User updateUser(int userId, User user) throws UsernameNotFoundException {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User not found with id: " + userId);
        }
        User existingUser = userOptional.get();

        if (user.getUsername() != null) {
            existingUser.setUsername(user.getUsername());
        }
        if (user.getEmail() != null) {
            existingUser.setEmail(user.getEmail());
        }
        if (user.getRole() != null) {
            existingUser.setRole(user.getRole());
        }


        return userRepository.save(existingUser);
    }

    public void deleteUser(int id) throws UsernameNotFoundException {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .filter(user -> !user.getRole().equals("admin"))
                .toList();
    }

    public User getUserById(int id) {
        return userRepository.findById(id).orElse(null);
    }

//    @Transactional
    public User changeUserRole(int userId, String newRole) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        List<Orders>orders = orderRepository.findAll().stream().filter(order -> order.getUserId() == userId).toList();
        if(!orders.isEmpty()){
            return null;
        }
        List<Product> products = productsRepository.findAll().stream().filter(product -> product.getSellerId() == userId).toList();
        if(!products.isEmpty()){
            return null;
        }
        user.setRole(newRole);
        return userRepository.save(user);
    }
}