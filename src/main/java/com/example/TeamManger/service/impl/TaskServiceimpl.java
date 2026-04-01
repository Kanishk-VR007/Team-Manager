package com.example.TeamManger.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import com.example.TeamManger.entity.Users;
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
    public Task SaveTask(Task data){
        return obj.save(data);
    }
    public Task getTaskById(Long id){
        return obj.findById(id).orElseThrow(()->new RuntimeException("No data found"));
    }
    public List<Task> getAllTasks(String email){
        Users user=obj2.findByEmail(email);
        return obj.findByUser(user);
    }
    public Task UpdateTask(Long id,Task data){
        Task task=obj.findById(id).orElseThrow(()->new RuntimeException("No data is found"));
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
    public void DeleteTask(Long id){
        Task task=obj.findById(id).orElseThrow(()->new RuntimeException("No data Exist"));
        obj.deleteById(task.getId());
    }
}
