package com.narmadha.recipe_backend.dto;

import com.narmadha.recipe_backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private User user;
}
