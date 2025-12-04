import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const goToAddRecipe = () => navigate("/add");
  const goToViewRecipes = () => navigate("/view");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "40px",
        position: "relative",
      }}
    >

      {/* Logout Button - Top Right */}
      <button
        onClick={logout}
        style={{
          position: "absolute",
          top: "25px",
          right: "25px",
          backgroundColor: "#c4a4e0",
          padding: "10px 18px",
          border: "none",
          borderRadius: "8px",
          color: "white",
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
          transition: "0.3s",
        }}
        onMouseOver={(e) => (e.target.style.transform = "scale(1.08)")}
        onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
      >
        Logout
      </button>

      {/* Heading - Left & Center vertically */}
      <h1
        style={{
          position: "absolute",
          left: "70px",
          top: "35%",                 // Slightly upper center
          transform: "translateY(-50%)",
          fontSize: "38px",
          color: "#ffffff",
          fontWeight: "800",
          letterSpacing: "1px",
          textShadow: "0px 3px 6px rgba(0,0,0,0.4)"
        }}
      >
        🍽️ Welcome to Food Recipe Manager
      </h1>

      {/* Left-side Box Buttons */}
      <div
        style={{
          position: "absolute",
          left: "100px",
          top: "60%",   // Perfect spacing under heading
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "row",
          gap: "50px",
        }}
      >

        {/* Add Recipe Box */}
        <div
          onClick={goToAddRecipe}
          style={{
            width: "280px",
            height: "190px",
            backgroundColor: "rgba(196, 164, 224, 0.85)",
            borderRadius: "18px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            cursor: "pointer",
            transition: "0.3s",
            backdropFilter: "blur(4px)",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <div style={{ fontSize: "45px", marginRight: "12px" }}>➕</div>
          <h2 style={{ color: "#2d3436", margin: 0, fontWeight: "600" }}>
            Add Recipe
          </h2>
        </div>

        {/* View Recipe Box */}
        <div
          onClick={goToViewRecipes}
          style={{
            width: "280px",
            height: "190px",
            backgroundColor: "rgba(196, 164, 224, 0.85)",
            borderRadius: "18px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            cursor: "pointer",
            transition: "0.3s",
            backdropFilter: "blur(4px)",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <div style={{ fontSize: "45px", marginRight: "12px" }}>👀</div>
          <h2 style={{ color: "#2d3436", margin: 0, fontWeight: "600" }}>
            View Recipes
          </h2>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
