import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import AddRecipePage from "./pages/AddRecipePage";
import ViewRecipePage from "./pages/ViewRecipePage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/add"
          element={
            <PrivateRoute>
              <AddRecipePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/view"
          element={
            <PrivateRoute>
              <ViewRecipePage />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
