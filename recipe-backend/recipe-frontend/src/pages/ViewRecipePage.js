import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewRecipePage() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPrep, setFilterPrep] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/recipes");
      const data = await res.json();
      setRecipes(data);
    } catch (err) {
      console.error("Failed to load recipes", err);
    }
  };

  // ❤️ Like (store in DB)
  const handleLike = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/recipes/${id}/like`,
        { method: "POST" }
      );
      const data = await res.json();

      setRecipes((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, likes: data.likes } : r
        )
      );
    } catch (err) {
      console.error("Failed to like recipe", err);
    }
  };

  // 💬 Add comment
  const handleAddComment = async (id, text, clearInput) => {
    if (!text.trim()) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/recipes/${id}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        }
      );

      const comments = await res.json();

      setRecipes((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, comments } : r
        )
      );

      clearInput();
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  // 🔍 Search + Filter
  const filteredRecipes = recipes
    .filter((r) => r.title?.toLowerCase().includes(search.toLowerCase()))
    .filter((r) => (filterCategory ? r.category === filterCategory : true))
    .filter((r) => (filterPrep ? (r.prepTime || 9999) <= Number(filterPrep) : true));

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3e9ff",
        padding: "30px 40px",
        position: "relative",
      }}
    >
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          backgroundColor: "#8e44ad",
          padding: "12px 18px",
          border: "none",
          borderRadius: "10px",
          color: "white",
          fontSize: "17px",
          cursor: "pointer",
          fontWeight: "700",
        }}
      >
        ⬅ Back
      </button>

      {/* Heading */}
      <h1
        style={{
          fontSize: "40px",
          fontWeight: "800",
          color: "#4a148c",
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        🍽️ All Recipes
      </h1>

      {/* Search + Filters */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "25px",
          justifyContent: "center",
        }}
      >
        {/* Search */}
        <input
          type="text"
          placeholder="Search recipe..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
        />

        {/* Filter: Category */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">All Categories</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
          <option value="Dessert">Dessert</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snacks">Snacks</option>
          <option value="Sweets">Sweets</option>
          <option value="Drinks">Drinks</option>
          <option value="Healthy">Healthy</option>
        </select>

        {/* Filter: Prep Time */}
        <select
          value={filterPrep}
          onChange={(e) => setFilterPrep(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Prep Time</option>
          <option value="10">≤ 10 mins</option>
          <option value="20">≤ 20 mins</option>
          <option value="30">≤ 30 mins</option>
          <option value="60">≤ 1 hour</option>
          <option value="120">≤ 2 hours</option>
        </select>
      </div>

      {/* Recipe Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
        }}
      >
        {filteredRecipes.map((r) => (
          <RecipeCard
            key={r.id}
            recipe={r}
            onLike={handleLike}
            onAddComment={handleAddComment}
          />
        ))}
      </div>
    </div>
  );
}

// 🔹 Card Component
function RecipeCard({ recipe, onLike, onAddComment }) {
  const [activeTab, setActiveTab] = useState(null);
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = () => {
    onAddComment(recipe.id, newComment, () => setNewComment(""));
  };

  const comments = recipe.comments || [];

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(8px)",
        padding: "18px",
        borderRadius: "18px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
      }}
    >
      {/* Title */}
      <h3 style={{ fontSize: "22px", fontWeight: "700", color: "#4a148c" }}>
        {recipe.title}
      </h3>

      {/* Show image only if ingredients tab is not active */}
      {activeTab !== "ingredients" && recipe.photoBase64 && (
        <img
          src={recipe.photoBase64}
          alt="Recipe"
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: "12px",
            marginBottom: "12px",
          }}
        />
      )}

      {/* Buttons */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <button
          onClick={() =>
            setActiveTab((t) => (t === "ingredients" ? null : "ingredients"))
          }
          style={{
            flex: 1,
            backgroundColor:
              activeTab === "ingredients" ? "#6a1b9a" : "#ab47bc",
            color: "white",
            borderRadius: "8px",
            border: "none",
            padding: "8px",
            fontWeight: "600",
          }}
        >
          🍲 Ingredients
        </button>

        <button
          onClick={() =>
            setActiveTab((t) => (t === "comments" ? null : "comments"))
          }
          style={{
            flex: 1,
            backgroundColor:
              activeTab === "comments" ? "#3949ab" : "#5c6bc0",
            color: "white",
            borderRadius: "8px",
            border: "none",
            padding: "8px",
            fontWeight: "600",
          }}
        >
          💬 Comments ({comments.length})
        </button>
      </div>

      {/* INGREDIENT / DESCRIPTION */}
      {activeTab === "ingredients" && (
        <div
          style={{
            backgroundColor: "#f3e5f5",
            borderRadius: "10px",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h4 style={{ fontWeight: "700", color: "#4a148c" }}>
            Ingredients / Description
          </h4>
          <p>{recipe.description}</p>
        </div>
      )}

      {/* COMMENTS */}
      {activeTab === "comments" && (
        <div
          style={{
            backgroundColor: "#e8eaf6",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <h4 style={{ fontWeight: "700", color: "#1a237e" }}>Comments</h4>

          {/* List */}
          <div
            style={{
              maxHeight: "120px",
              overflowY: "auto",
              marginBottom: "8px",
            }}
          >
            {comments.length === 0 ? (
              <p>No comments yet.</p>
            ) : (
              comments.map((c) => (
                <div
                  key={c.id}
                  style={{
                    backgroundColor: "#fff",
                    padding: "6px 8px",
                    marginBottom: "6px",
                    borderRadius: "6px",
                  }}
                >
                  {c.text}
                </div>
              ))
            )}
          </div>

          {/* Add comment */}
          <div style={{ display: "flex", gap: "6px" }}>
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              style={{
                flex: 1,
                padding: "6px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={handleSubmitComment}
              style={{
                padding: "6px 10px",
                backgroundColor: "#3949ab",
                color: "white",
                border: "none",
                borderRadius: "8px",
              }}
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Like */}
      <button
        onClick={() => onLike(recipe.id)}
        style={{
          marginTop: "10px",
          width: "100%",
          padding: "10px",
          backgroundColor: "#ff5c8a",
          color: "white",
          border: "none",
          borderRadius: "10px",
          fontWeight: "700",
        }}
      >
        ❤️ Like ({recipe.likes || 0})
      </button>
    </div>
  );
}

export default ViewRecipePage;
