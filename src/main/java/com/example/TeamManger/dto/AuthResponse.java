package com.example.TeamManger.dto;

import org.springframework.stereotype.Component;

import com.example.TeamManger.entity.Role;

@Component
public class AuthResponse {
    private Long id;
    private String name;
    private Role role;
    private String token;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Role getRole() {
        return role;
    }
    public void setRole(Role role) {
        this.role = role;
    }
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public AuthResponse(Long id, String name, Role role, String token) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.token = token;
    }
    public AuthResponse() {
    }
}
