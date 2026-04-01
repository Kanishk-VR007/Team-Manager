package com.example.TeamManger.entity;

import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Task {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;
    private String taskName;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String  completionStatus;
    @ManyToOne
    @JoinColumn(name="user")
    private Users user;
    public Long getId(){
        return id;
    }
    public String getTaskName() {
        return taskName;
    }
    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }
    public LocalDateTime getStartTime() {
        return startTime;
    }
    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }
    public LocalDateTime getEndTime() {
        return endTime;
    }
    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }
    public String getCompletionStatus() {
        return completionStatus;
    }
    public void setCompletionStatus(String completionStatus) {
        this.completionStatus = completionStatus;
    }
    public Users getUser(){
        return user;
    }
    public void setUser(Users user){
        this.user=user;
    }
    public Task(){}
    public Task(String taskName,LocalDateTime startTime,LocalDateTime endTime,String completionStatus,Users user){
        this.taskName=taskName;
        this.startTime=startTime;
        this.endTime=endTime;
        this.completionStatus=completionStatus;
        this.user=user;
    }
}
