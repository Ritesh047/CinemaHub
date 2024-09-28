package com.example.movieapp.service;

import com.example.movieapp.model.User;
import com.example.movieapp.repository.UserRepository; // Ensure this repository is created
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository; // Injecting UserRepository

    public List<User> getAllUsers() {
        return userRepository.findAll(); // Fetch all users from the database
    }

    // Add other methods as needed
}
