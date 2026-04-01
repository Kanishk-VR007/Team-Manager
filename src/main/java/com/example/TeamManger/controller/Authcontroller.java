package com.example.TeamManger.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.TeamManger.dto.AuthRequest;
import com.example.TeamManger.dto.AuthResponse;
import com.example.TeamManger.entity.Users;
import com.example.TeamManger.security.Jwtutil;
import com.example.TeamManger.service.UserService;


@RequestMapping("/auth")
@RestController
public class Authcontroller {
    @Autowired
    UserService obj;
    @Autowired
    Jwtutil obj2;
    @PostMapping("/register")
    ResponseEntity<?> SaveUser(@RequestBody Users data){
        try{
            if(obj.checkpassword(data)){
                return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body("Please enter your Password credentials correctly");
            }            
            if(!obj.getByEmail(data.getEmail())){
                return new ResponseEntity<>(obj.Register(data),HttpStatus.OK);
        }
            else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("The Email already exist");
            }
        }
        catch(RuntimeException e){
            return new  ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest data){
        //validation
        try{
        Users user=obj.getinfoByEmail(data.getEmail());
        AuthResponse userdata=new AuthResponse();
        userdata.setName(user.getUserName());
        userdata.setRole(user.getRole());
        userdata.setId(user.getId());
        userdata.setToken(obj2.gen_token(user.getEmail(),user.getRole()));
        return new ResponseEntity<>(userdata,HttpStatus.OK);
    }
        catch(Exception e){
            System.out.println(e.getMessage());
            return new ResponseEntity<>("Enter a Valid Credential",HttpStatus.BAD_REQUEST);
        }

    }
}
