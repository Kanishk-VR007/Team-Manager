package com.example.TeamManger.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import com.example.TeamManger.entity.Users;
import com.example.TeamManger.entity.Role;
import org.springframework.stereotype.Service;
import com.example.TeamManger.service.TaskService;
import com.example.TeamManger.entity.Task;
import com.example.TeamManger.repository.Taskrepository;
import com.example.TeamManger.repository.Userrepository;

@Service
public class TaskServiceimpl implements TaskService{
    @Autowired
    Taskrepository obj;
    @Autowired
    Userrepository obj2;
    public Task SaveTask(Task data, String email){
        Users currentUser = obj2.findByEmail(email);
        if (currentUser == null) currentUser = obj2.findByUserName(email);
        if (currentUser == null) throw new RuntimeException("User not found");
        
        if (data.getUser() != null && data.getUser().getId() != null) {
            Users assignee = obj2.findById(data.getUser().getId()).orElseThrow(() -> new RuntimeException("Assignee not found"));
            data.setUser(assignee);
        } else {
            data.setUser(currentUser);
        }
        return obj.save(data);
    }
    public Task getTaskById(Long id, String email){
        Task task = obj.findById(id).orElseThrow(()->new RuntimeException("No data found"));
        Users user = obj2.findByEmail(email);
        if (user == null) user = obj2.findByUserName(email);
        
        if (user.getRole() == Role.ADMIN || user.getRole() == Role.PROJECT_MANAGER) {
            return task;
        }
        
        if (task.getUser() == null || !task.getUser().getId().equals(user.getId())) {
            throw new SecurityException("Unauthorized access to task");
        }
        return task;
    }
    public List<Task> getAllTasks(String email){
        Users user=obj2.findByEmail(email);
        if (user == null) user = obj2.findByUserName(email);
        
        if (user.getRole() == Role.ADMIN || user.getRole() == Role.PROJECT_MANAGER) {
            return obj.findAll();
        }
        return obj.findByUser(user);
    }
    public Task UpdateTask(Long id, Task data, String email){
        Task task = getTaskById(id, email); // Reuse the ownership check
        if(data.getTaskName()!=null){
            task.setTaskName(data.getTaskName());
        }
        if(data.getStartTime()!=null){
            task.setStartTime(data.getStartTime());
        }
        if(data.getEndTime()!=null){
            task.setEndTime(data.getEndTime());
        }
        if(data.getCompletionStatus()!=null){
            task.setCompletionStatus(data.getCompletionStatus());
        }
        return obj.save(task);
    }
    public void DeleteTask(Long id, String email){
        Task task = getTaskById(id, email); // Reuse the ownership check
        obj.deleteById(task.getId());
    }
}
