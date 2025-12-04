package com.narmadha.recipe_backend.controller;

import com.narmadha.recipe_backend.dto.LoginRequest;
import com.narmadha.recipe_backend.dto.LoginResponse;
import com.narmadha.recipe_backend.dto.RegistrationRequest;
import com.narmadha.recipe_backend.entity.User;
import com.narmadha.recipe_backend.repository.UserRepository;
import com.narmadha.recipe_backend.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    // <-- add JwtUtil here
    public AuthController(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegistrationRequest req) {
        if (req.getUsername() == null || req.getEmail() == null || req.getPassword() == null) {
            return ResponseEntity.badRequest().body("username, email and password are required");
        }

        if (userRepository.findByUsername(req.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("username already exists");
        }
        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("email already exists");
        }

        String hashed = BCrypt.hashpw(req.getPassword(), BCrypt.gensalt(12));
        User u = new User();
        u.setUsername(req.getUsername());
        u.setEmail(req.getEmail());
        u.setPasswordHash(hashed);

        User saved = userRepository.save(u);

        // Don't send passwordHash back
        saved.setPasswordHash(null);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        if (req.getUsernameOrEmail() == null || req.getPassword() == null) {
            return ResponseEntity.badRequest().body("username/email and password required");
        }

        Optional<User> userOpt = userRepository.findByUsername(req.getUsernameOrEmail());
        if (userOpt.isEmpty()) {
            userOpt = userRepository.findByEmail(req.getUsernameOrEmail());
        }
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("invalid credentials");
        }

        User user = userOpt.get();
        boolean ok = BCrypt.checkpw(req.getPassword(), user.getPasswordHash());
        if (!ok) return ResponseEntity.status(401).body("invalid credentials");

        // generate token using JwtUtil
        String token = jwtUtil.generateToken(user.getUsername());

        // hide password before returning
        user.setPasswordHash(null);

        // return token + user
        return ResponseEntity.ok(new LoginResponse(token, user));
    }
}
