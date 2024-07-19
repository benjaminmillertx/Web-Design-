package com.casting.model;

import javax.persistence.*;

@Entity
public class MovieApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;

    private String status; // applied, selected, rejected

    // Getters and setters
}
