package net.javaguides.ems.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import net.javaguides.ems.models.AuthenticationResponse;
import net.javaguides.ems.models.User;
import net.javaguides.ems.repository.UserRepository;
import net.javaguides.ems.service.AuthenticationService;

@CrossOrigin(origins = "http://localhost:3030")
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private AuthenticationService authService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

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

    @PutMapping("/{id}")
    public User updateUser(@RequestBody User user, @PathVariable int id) {
        User repoUser = this.userRepository.findById(id).orElse(null);
        if (repoUser != null) {
            repoUser.setName(user.getName());
            repoUser.setEmail(user.getEmail());
            repoUser.setAddress(user.getAddress());
            repoUser.setAge(user.getAge());
            if (user.getPassword() != "") {
                repoUser.setPassword(passwordEncoder.encode(user.getPassword()));
            }
            if (user.getRole() != null) {
                repoUser.setRole(user.getRole());
            }
            this.userRepository.save(repoUser);
            return repoUser;
        }
        return null;
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable int id) {
        User user = this.userRepository.findById(id).orElse(null);
        return user;
    }

    @GetMapping("")
    public List<HashMap<String, Object>> getUsers() {

        List<User> users = this.userRepository.findAll();
        ArrayList<HashMap<String, Object>> list = new ArrayList<HashMap<String, Object>>();
        for (User user : users) {
            list.add(user.toHashMap());
        }
        return list;
    }

    @DeleteMapping("/{id}")
    public HashMap<String, Object> deleteUser(@PathVariable int id) {
        User user = this.userRepository.findById(id).orElse(null);
        if (user != null) {
            this.userRepository.delete(user);
            return user.toHashMap();
        }
        return null;
    }

    public User getUserFromToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String jwtToken = authHeader.substring(7); // Remove "Bearer " prefix
            return authService.getUserFromToken(jwtToken);
        } else {
            throw null;
        }
    }

    @GetMapping("/jwt")
    public HashMap<String, Object> getMethodName(HttpServletRequest request) {
        User user = getUserFromToken(request);
        if (user == null) {
            return new HashMap<String, Object>();
        }
        return user.toHashMap();
    }

}
