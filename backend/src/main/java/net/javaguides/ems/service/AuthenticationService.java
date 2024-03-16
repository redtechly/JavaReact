package net.javaguides.ems.service;

import net.javaguides.ems.models.AuthenticationResponse;
import net.javaguides.ems.models.Role;
import net.javaguides.ems.models.User;
import net.javaguides.ems.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JWTService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;

    public AuthenticationResponse register(User request) {

        // check if user already exist. if exist than authenticate the user
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return new AuthenticationResponse(null, new User());
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setAddress(user.getAddress());
        user.setAge(user.getAge());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        user = userRepository.save(user);

        String jwt = jwtService.generateToken(user);

        // saveUserToken(jwt, user);

        return new AuthenticationResponse(jwt, user);

    }

    public AuthenticationResponse authenticate(User request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        String jwt = jwtService.generateToken(user);

        // revokeAllTokenByUser(user);
        // saveUserToken(jwt, user);

        return new AuthenticationResponse(jwt, user);
    }

    // private void revokeAllTokenByUser(User user) {
    // List<Token> validTokens = tokenRepository.findAllTokensByUser(user.getId());
    // if (validTokens.isEmpty()) {
    // return;
    // }

    // validTokens.forEach(t -> {
    // t.setLoggedOut(true);
    // });

    // tokenRepository.saveAll(validTokens);
    // }

    // private void saveUserToken(String jwt, User user) {
    // Token token = new Token();
    // token.setToken(jwt);
    // token.setLoggedOut(false);
    // token.setUser(user);
    // tokenRepository.save(token);
    // }

}
