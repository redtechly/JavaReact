package net.javaguides.ems.controller;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.ems.models.Cart;
import net.javaguides.ems.models.Product;
import net.javaguides.ems.models.User;
// import net.javaguides.ems.repository.CartRepository;
// import net.javaguides.ems.service.AuthenticationService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/cart")
public class CartController {
    // @Autowired
    // private AuthenticationService authService;

    // @Autowired
    // private CartRepository cartRepository;

    public Cart removeFromCart(User user, Product product, int quantity) {
        return null;
    }

    public Cart addToCart(String jwt, Product product, int quantity) {
        // User user = authService.getUserFromToken(jwt);
        // cartRepository.save(new Cart(user, product, quantity));
        return null;
    }

    public Cart getCart(User user) {
        return null;
    }
}
