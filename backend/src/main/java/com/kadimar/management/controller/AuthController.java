package com.kadimar.management.controller;

import com.kadimar.management.model.User;
import com.kadimar.management.payload.LoginRequest;
import com.kadimar.management.payload.RegisterResponse;
import com.kadimar.management.security.JwtTokenProvider;
import com.kadimar.management.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Collections;
import java.util.HashSet;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Log the login attempt
            System.out.println("Login attempt for email: " + loginRequest.getEmail());
            
            // Check if user exists
            try {
                User user = userService.getUserByEmail(loginRequest.getEmail());
                System.out.println("User found: " + user.getEmail());
            } catch (RuntimeException e) {
                System.err.println("User not found: " + loginRequest.getEmail());
                return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error", "Invalid email or password"));
            }
            
            // Attempt authentication
            try {
                Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                    )
                );

                String token = tokenProvider.generateToken(authentication);
                
                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("message", "Login successful");
                
                System.out.println("Login successful for email: " + loginRequest.getEmail());
                return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(response);
            } catch (BadCredentialsException e) {
                System.err.println("Invalid credentials for email: " + loginRequest.getEmail());
                return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error", "Invalid email or password"));
            }
                
        } catch (Exception e) {
            System.err.println("Login failed for email: " + loginRequest.getEmail());
            System.err.println("Error message: " + e.getMessage());
            e.printStackTrace(); // Add stack trace for debugging
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Map.of("error", "An error occurred during login"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        System.out.println("=== Starting registration process ===");
        System.out.println("Received request with email: " + user.getEmail());
        
        try {
            // Create the user
            User newUser = userService.createUser(user);
            System.out.println("Successfully created user with email: " + newUser.getEmail());
            
            // Create response
            RegisterResponse response = new RegisterResponse(
                null,
                new RegisterResponse.UserDTO(
                    newUser.getEmail(),
                    newUser.getFirstName(),
                    newUser.getLastName()
                )
            );
            
            System.out.println("=== Registration successful ===");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("=== Registration failed ===");
            System.err.println("Error message: " + e.getMessage());
            e.printStackTrace();
            
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Registration failed: " + e.getMessage()));
        }
    }

    @GetMapping("/test")
    public ResponseEntity<?> test() {
        try {
            // Create a test user if it doesn't exist
            String testEmail = "admin@kadimar.com";
            String testPassword = "password123";
            
            try {
                userService.getUserByEmail(testEmail);
                System.out.println("Test user already exists");
            } catch (RuntimeException e) {
                User testUser = new User();
                testUser.setEmail(testEmail);
                testUser.setPassword(testPassword);
                testUser.setFirstName("Admin");
                testUser.setLastName("User");
                testUser.setRoles(new HashSet<>(Collections.singletonList("ADMIN")));
                
                userService.createUser(testUser);
                System.out.println("Created test user: " + testEmail);
            }
            
            return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(Map.of(
                    "message", "Test endpoint is accessible",
                    "testCredentials", Map.of(
                        "email", testEmail,
                        "password", testPassword
                    )
                ));
        } catch (Exception e) {
            System.err.println("Test endpoint error: " + e.getMessage());
            return ResponseEntity.status(500)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/test2")
    public ResponseEntity<String> test2() {
        System.out.println("Test endpoint 2 called");
        return ResponseEntity.ok("Auth endpoint 2 is accessible");
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userService.getUserByEmail(email);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(500)
                .body(Map.of("error", "Failed to fetch user data: " + e.getMessage()));
        }
    }
}