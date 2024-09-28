package com.example.movieapp.controller;

import com.example.movieapp.service.UserService;
import com.example.movieapp.model.User; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/watchlist")
public class WatchlistController {

    @Autowired
    private UserService userService;

    // Endpoint to get all users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers(); // Call service method
    }

    // Add other endpoints as needed
}
