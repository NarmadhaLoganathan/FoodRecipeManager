package com.narmadha.recipe_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Entity
@Data
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String category;

    // total minutes = (hours * 60) + minutes
    private Integer prepTime;  

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] photo;

    private Integer likes = 0;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    public String getPhotoBase64() {
        return photo != null ? Base64.getEncoder().encodeToString(photo) : null;
    }
}
