package com.example.TeamManger.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@PreAuthorize("hasRole('ADMIN')")
public class UserController {

    @PostMapping
    public ResponseEntity<String> createUser() {
        // Implementation for creating user
        return ResponseEntity.ok("User created successfully");
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<String> updateUserRole(@PathVariable Long id) {
        // Implementation for updating user role
        return ResponseEntity.ok("User role updated successfully");
    }
}
