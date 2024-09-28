package com.example.movieapp.model; // Change this to match your actual package structure

import javax.persistence.*;

@Entity
@Table(name = "watchlist_items") // Table name in the database
public class WatchlistItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String movieTitle; // Example property
    private String movieId;    // Example property

    @ManyToOne // Many watchlist items can belong to one user
    @JoinColumn(name = "user_id") // Foreign key column in the database
    private User user;

    // Default constructor (required by JPA)
    public WatchlistItem() {
    }

    // Parameterized constructor
    public WatchlistItem(String movieTitle, String movieId) {
        this.movieTitle = movieTitle;
        this.movieId = movieId;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMovieTitle() {
        return movieTitle;
    }

    public void setMovieTitle(String movieTitle) {
        this.movieTitle = movieTitle;
    }

    public String getMovieId() {
        return movieId;
    }

    public void setMovieId(String movieId) {
        this.movieId = movieId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
