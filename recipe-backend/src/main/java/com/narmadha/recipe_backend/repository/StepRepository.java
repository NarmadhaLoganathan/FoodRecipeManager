package com.narmadha.recipe_backend.repository;

import com.narmadha.recipe_backend.entity.Step;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StepRepository extends JpaRepository<Step, Long> {
}
