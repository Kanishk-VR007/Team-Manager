package com.example.TeamManger.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.FetchType;
import jakarta.persistence.Column;
import java.util.List;

@Entity
public class Users {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;
    private String userName;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(name = "full_name")
    private String fullName;
    
    @Column(name = "github_link")
    private String githubLink;
    
    @Column(name = "workload_score")
    private Integer workloadScore = 0;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;
    
    private Role role=Role.DEVELOPER;
    private String fpassword;
    private String cpassword;
    @com.fasterxml.jackson.annotation.JsonIgnore
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

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getGithubLink() {
        return githubLink;
    }

    public void setGithubLink(String githubLink) {
        this.githubLink = githubLink;
    }

    public Integer getWorkloadScore() {
        return workloadScore;
    }

    public void setWorkloadScore(Integer workloadScore) {
        this.workloadScore = workloadScore;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
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
    
    public Team getTeam() {
        return team;
    }
    
    public void setTeam(Team team) {
        this.team = team;
    }

    @com.fasterxml.jackson.annotation.JsonIgnore
    public List<Task> getTasks() {
        return task;
    }

    public void setTasks(List<Task> task) {
        this.task = task;
    }

    public Users(Long id, String userName, String email, Role role, String fpassword, String cpassword,
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
