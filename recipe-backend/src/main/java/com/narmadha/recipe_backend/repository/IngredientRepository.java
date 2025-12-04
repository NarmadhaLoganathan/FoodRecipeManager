package com.narmadha.recipe_backend.repository;

import com.narmadha.recipe_backend.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
}
