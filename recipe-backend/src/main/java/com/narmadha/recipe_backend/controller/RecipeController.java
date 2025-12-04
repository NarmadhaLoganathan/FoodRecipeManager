package com.narmadha.recipe_backend.controller;

import com.narmadha.recipe_backend.entity.Comment;
import com.narmadha.recipe_backend.entity.Recipe;
import com.narmadha.recipe_backend.repository.RecipeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "*")
public class RecipeController {

    private final RecipeRepository recipeRepository;

    public RecipeController(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    // ⭐ LIST ALL RECIPES
    @GetMapping
    public List<Map<String, Object>> getAllRecipes() {
        List<Recipe> recipes = recipeRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Recipe r : recipes) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", r.getId());
            map.put("title", r.getTitle());
            map.put("description", r.getDescription());
            map.put("category", r.getCategory());
            map.put("prepTime", r.getPrepTime());
            map.put("likes", r.getLikes());

            map.put("photoBase64", r.getPhotoBase64() != null
                    ? "data:image/jpeg;base64," + r.getPhotoBase64()
                    : null);

            // comments
            List<Map<String, Object>> commentsList = new ArrayList<>();
            for (Comment c : r.getComments()) {
                Map<String, Object> cMap = new HashMap<>();
                cMap.put("id", c.getId());
                cMap.put("text", c.getText());
                cMap.put("createdAt", c.getCreatedAt());
                commentsList.add(cMap);
            }
            map.put("comments", commentsList);

            result.add(map);
        }
        return result;
    }

    // ⭐ ADD RECIPE WITH category + prep hours + minutes
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> addRecipe(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("category") String category,
            @RequestParam("prepHours") Integer prepHours,
            @RequestParam("prepMinutes") Integer prepMinutes,
            @RequestParam(value = "photo", required = false) MultipartFile photo
    ) throws IOException {

        Recipe recipe = new Recipe();
        recipe.setTitle(title);
        recipe.setDescription(description);
        recipe.setCategory(category);

        // ⭐ Convert hours + minutes → total minutes
        int totalMinutes = (prepHours * 60) + prepMinutes;
        recipe.setPrepTime(totalMinutes);

        // image
        if (photo != null && !photo.isEmpty()) {
            recipe.setPhoto(photo.getBytes());
        }

        Recipe saved = recipeRepository.save(recipe);
        return ResponseEntity.ok(saved.getId());
    }

    // ⭐ GET ONE RECIPE
    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipe(@PathVariable Long id) {
        return recipeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ⭐ DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRecipe(@PathVariable Long id) {
        if (!recipeRepository.existsById(id))
            return ResponseEntity.notFound().build();

        recipeRepository.deleteById(id);
        return ResponseEntity.ok("Deleted");
    }

    // ⭐ LIKE
    @PostMapping("/{id}/like")
    public ResponseEntity<?> likeRecipe(@PathVariable Long id) {
        return recipeRepository.findById(id)
                .map(recipe -> {
                    recipe.setLikes(recipe.getLikes() + 1);
                    recipeRepository.save(recipe);

                    return ResponseEntity.ok(Map.of("likes", recipe.getLikes()));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ⭐ COMMENT
    @PostMapping("/{id}/comments")
    public ResponseEntity<?> addComment(
            @PathVariable Long id,
            @RequestBody Map<String, String> body
    ) {
        String text = body.get("text");
        if (text == null || text.isBlank())
            return ResponseEntity.badRequest().body("Comment text required");

        return recipeRepository.findById(id).map(recipe -> {
            Comment c = new Comment();
            c.setText(text.trim());
            c.setCreatedAt(LocalDateTime.now());
            c.setRecipe(recipe);

            recipe.getComments().add(c);
            recipeRepository.save(recipe);

            return ResponseEntity.ok(recipe.getComments());
        }).orElse(ResponseEntity.notFound().build());
    }
}
