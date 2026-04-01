package com.example.TeamManger.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.TeamManger.entity.Task;
import com.example.TeamManger.service.TaskService;

@RestController
 @RequestMapping("/tasks")
public class Taskcontroler {
    @Autowired
    TaskService obj;
    @PostMapping("/save")
    ResponseEntity<?> SaveTask(@RequestBody Task data){
        try{
            return new ResponseEntity<>(obj.SaveTask(data),HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>("Some Conflicted",HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/getById/{id}")
    ResponseEntity<?> GetDataById(@PathVariable Long id){
        try{
            return new ResponseEntity<>(obj.getTaskById(id),HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>("No data found for the id",HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/GetallData")
    ResponseEntity<?> GetAllData(){
        try{
            String email=SecurityContextHolder.getContext().getAuthentication().getName();
            return new ResponseEntity<>(obj.getAllTasks(email),HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>("No data is found",HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/delete/{id}")
    ResponseEntity<String> DeleteTask(@PathVariable Long id){
        try{
            obj.DeleteTask(id);
            return new ResponseEntity<>("Deleted Sucessfully",HttpStatus.OK);
        }catch(RuntimeException error){
            return new ResponseEntity<>(error.getMessage(),HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/update/{id}")
    ResponseEntity<?> UpdateTask(@PathVariable Long id,@RequestBody Task data){
        try{
            return new ResponseEntity<>(obj.UpdateTask(id, data),HttpStatus.OK);
        }
        catch(RuntimeException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }
}
