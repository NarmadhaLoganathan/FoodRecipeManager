import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddRecipePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Veg");
  const [prepHours, setPrepHours] = useState(0);
  const [prepMinutes, setPrepMinutes] = useState(0);
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("prepHours", prepHours);
    formData.append("prepMinutes", prepMinutes);
    if (photo) formData.append("photo", photo);

    try {
      await axios.post("http://localhost:8080/api/recipes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Recipe added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Save recipe error:", error);
      alert("Failed to add recipe.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/image4.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        position: "relative",
      }}
    >

      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: "25px",
          left: "25px",
          backgroundColor: "#9c49d3ff",
          padding: "18px 20px",
          border: "none",
          borderRadius: "8px",
          color: "white",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        ⬅ Back
      </button>

      {/* Glass Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "550px",
          background: "rgba(255, 255, 255, 0.2)",
          padding: "35px",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "32px",
            fontWeight: "800",
            color: "#ffffff",
            marginBottom: "25px",
          }}
        >
          ➕ Add New Recipe
        </h2>

        <form onSubmit={handleSubmit} style={{ color: "#fff", fontWeight: "600" }}>
          
          {/* Title */}
          <label>Recipe Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              marginTop: "5px",
              marginBottom: "20px",
              background: "rgba(181, 171, 228, 0.8)",
              color: "#000",
            }}
          />

          {/* Category */}
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              background: "rgba(181, 171, 228, 0.8)",
              color: "#000",
              marginBottom: "20px",
              border: "none",
            }}
          >
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Dessert">Dessert</option>
            <option value="Juice">Juice</option>
            <option value="Snacks">Snacks</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Dinner">Dinner</option>
          </select>

          {/* Preparation Time */}
          <label>Preparation Time</label>
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <select
              value={prepHours}
              onChange={(e) => setPrepHours(e.target.value)}
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "10px",
                background: "rgba(181, 171, 228, 0.8)",
                color: "#000",
                border: "none",
              }}
            >
              {[...Array(10).keys()].map((hr) => (
                <option key={hr} value={hr}>
                  {hr} hr
                </option>
              ))}
            </select>

            <select
              value={prepMinutes}
              onChange={(e) => setPrepMinutes(e.target.value)}
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "10px",
                background: "rgba(181, 171, 228, 0.8)",
                color: "#000",
                border: "none",
              }}
            >
              {[0, 10, 20, 30, 40, 50].map((min) => (
                <option key={min} value={min}>
                  {min} min
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{
              width: "100%",
              height: "130px",
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              marginTop: "5px",
              marginBottom: "20px",
              background: "rgba(181, 171, 228, 0.8)",
              color: "#000",
            }}
          ></textarea>

          {/* Photo */}
          <label>Photo (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            style={{
              width: "100%",
              marginTop: "5px",
              marginBottom: "25px",
              color: "#fff",
            }}
          />

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#9c49d3ff",
              padding: "12px",
              fontSize: "18px",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            Save Recipe
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddRecipePage;
