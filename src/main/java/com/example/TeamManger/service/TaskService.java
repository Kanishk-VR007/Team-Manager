package com.example.TeamManger.service;

import java.util.List;

import com.example.TeamManger.entity.Task;

public interface TaskService {
    public Task SaveTask(Task data);
    public Task getTaskById(Long id);
    public List<Task> getAllTasks(String email);
    public Task UpdateTask(Long id,Task data);
    public void DeleteTask(Long id);
}
