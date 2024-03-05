package net.javaguides.ems.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import net.javaguides.ems.models.AuthenticationResponse;
import net.javaguides.ems.models.User;
import net.javaguides.ems.repository.UserRepository;
import net.javaguides.ems.service.AuthenticationService;
import net.javaguides.ems.service.JWTService;

@CrossOrigin(origins = "http://localhost:3030")
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private AuthenticationService authService;
    @Autowired
    private JWTService jwtService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody User request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody User request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @GetMapping("/hello")
    public Optional<User> hello(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        String token = authHeader.substring(7);
        String username = jwtService.extractUsername(token);
        return userRepository.findByEmail(username);
    }

}
