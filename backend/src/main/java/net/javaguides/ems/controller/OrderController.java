package net.javaguides.ems.controller;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.ems.models.Order;
import net.javaguides.ems.models.OrderItem;
import net.javaguides.ems.models.Product;
import net.javaguides.ems.models.User;
import net.javaguides.ems.repository.OrderItemRepository;
import net.javaguides.ems.repository.OrderRepository;
import net.javaguides.ems.repository.ProductRepository;
import net.javaguides.ems.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3030")
@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/createorder")
public ResponseEntity<Order> createOrder(@RequestBody HashMap<String, Object> requestData) {
   
    String userEmail = (String) requestData.get("useremail");
    List<HashMap<String, Object>> products = (List<HashMap<String, Object>>) requestData.get("products");
    String address = (String) requestData.get("address");
    double totalAmount = ((Number) requestData.get("totalAmount")).doubleValue();

    
    System.out.println("Received data:");
    System.out.println("User Email: " + userEmail);
    System.out.println("Address: " + address);
    System.out.println("Total Amount: " + totalAmount);
    System.out.println("Products:");
    System.out.println(products);
    for (HashMap<String, Object> productData : products) {
        Integer productId = (Integer) productData.get("productId");
        int quantity = (int) productData.get("quantity");
        System.out.println("Product ID: " + productId + ", Quantity: " + quantity);
    }

    
Optional<User> optionalUser = userRepository.findByEmail(userEmail);
if (!optionalUser.isPresent()) {
    return ResponseEntity.badRequest().build();
}

User user = optionalUser.get(); 

    
    Order order = new Order();
    order.setUser(user);
    order.setAddress(address);
    order.setTotalAmount(totalAmount);
    order.setStatus("Processing"); 
    order.setOrderDate(LocalDateTime.now()); 

    Order createdOrder = orderRepository.save(order);
    
    for (HashMap<String, Object> productData : products) {
        Integer productId = (Integer) productData.get("productId");
        int quantity = (int) productData.get("quantity");

        Product product = productRepository.findById(productId).orElse(null);
        if (product != null) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(createdOrder);
            orderItem.setProduct(product);
            orderItem.setQuantity(quantity); 
            orderItemRepository.save(orderItem);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
    return ResponseEntity.ok(createdOrder);
}
    


@GetMapping("/all")
public List<Order> getAllOrders() {
    return orderRepository.findAll();
}

@GetMapping("/byUser/{email}")
public List<Order> getOrdersByUserEmail(@PathVariable String email) {
    User user = userRepository.findByEmail(email).orElse(null);
    if (user != null) {
        return orderRepository.findByUser(user);
    } else {
        return null; 
    }
}



@PostMapping("/updatestatus/{orderId}/{status}")
public ResponseEntity<Order> updateOrderStatus(@PathVariable Long orderId, @PathVariable String status) {
    Optional<Order> optionalOrder = orderRepository.findById(orderId);
    if (optionalOrder.isPresent()) {
        Order order = optionalOrder.get();
        order.setStatus(status);
        Order updatedOrder = orderRepository.save(order);
        return ResponseEntity.ok(updatedOrder);
    } else {
        return ResponseEntity.notFound().build();
    }
}

@DeleteMapping("/delete/{orderId}")
public ResponseEntity<?> deleteOrder(@PathVariable Long orderId) {
    Optional<Order> optionalOrder = orderRepository.findById(orderId);
    if (optionalOrder.isPresent()) {
        orderRepository.deleteById(orderId);
        return ResponseEntity.ok().build();
    } else {
        return ResponseEntity.notFound().build();
    }
}

}
