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
import org.springframework.security.access.prepost.PreAuthorize;
import jakarta.validation.Valid;

import com.example.TeamManger.entity.Task;
import com.example.TeamManger.service.TaskService;

@RestController
 @RequestMapping("/tasks")
public class Taskcontroler {
    @org.springframework.web.bind.annotation.ExceptionHandler(org.springframework.web.bind.MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationExceptions(org.springframework.web.bind.MethodArgumentNotValidException ex) {
        return new ResponseEntity<>("Validation failed", HttpStatus.BAD_REQUEST);
    }

    @Autowired
    TaskService obj;
    @PreAuthorize("hasAnyRole('ADMIN', 'PROJECT_MANAGER', 'TEAM_LEAD')")
    @PostMapping("/save")
    ResponseEntity<?> SaveTask(@Valid @RequestBody Task data){
        try{
            String email=SecurityContextHolder.getContext().getAuthentication().getName();
            return new ResponseEntity<>(obj.SaveTask(data, email),HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>("Some Conflicted",HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/getById/{id}")
    ResponseEntity<?> GetDataById(@PathVariable Long id){
        try{
            String email=SecurityContextHolder.getContext().getAuthentication().getName();
            return new ResponseEntity<>(obj.getTaskById(id, email),HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>("No data found for the id",HttpStatus.NOT_FOUND);
        }
    }
    @PreAuthorize("hasAnyRole('ADMIN', 'PROJECT_MANAGER', 'TEAM_LEAD')")
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
    @PreAuthorize("hasAnyRole('ADMIN', 'PROJECT_MANAGER')")
    @DeleteMapping("/delete/{id}")
    ResponseEntity<String> DeleteTask(@PathVariable Long id){
        try{
            String email=SecurityContextHolder.getContext().getAuthentication().getName();
            obj.DeleteTask(id, email);
            return new ResponseEntity<>("Deleted Sucessfully",HttpStatus.OK);
        }catch(Exception error){
            return new ResponseEntity<>(error.getMessage(),HttpStatus.NOT_FOUND);
        }
    }
    @PreAuthorize("hasAnyRole('ADMIN', 'PROJECT_MANAGER', 'TEAM_LEAD', 'DEVELOPER', 'JUNIOR_DEV')")
    @PutMapping("/update/{id}")
    ResponseEntity<?> UpdateTask(@PathVariable Long id,@Valid @RequestBody Task data){
        try{
            String email=SecurityContextHolder.getContext().getAuthentication().getName();
            return new ResponseEntity<>(obj.UpdateTask(id, data, email),HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }
}
