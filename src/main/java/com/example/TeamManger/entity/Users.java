package com.example.TeamManger.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.List;

@Entity
public class Users {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;
    private String userName;
    private String email;
    private String role;
    private String fpassword;
    private String cpassword;
    @OneToMany(mappedBy = "user")
    private List<Task> task;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getFpassword() {
        return fpassword;
    }

    public void setFpassword(String fpassword) {
        this.fpassword = fpassword;
    }

    public void setCpassword(String cpassword) {
        this.cpassword = cpassword;
    }

    public String getCpassword() {
        return cpassword;
    }

    public Users() {

    }

    public List<Task> getTasks() {
        return task;
    }

    public void setTasks(List<Task> task) {
        this.task = task;
    }

    public Users(Long id, String userName, String email, String role, String fpassword, String cpassword,
            List<Task> task) {
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.role = role;
        this.fpassword = fpassword;
        this.cpassword = cpassword;
        this.task = task;
    }
}
