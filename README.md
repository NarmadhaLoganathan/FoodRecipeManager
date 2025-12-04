🍽️ Food Recipe Manager

A simple and user-friendly web application to create, store, and explore your favorite recipes.

Overview

Food Recipe Manager is a full-stack project where users can add their own recipes, upload photos, view all recipes, and interact with them using likes and comments.
The app also includes filters, search options, and category sorting to help users quickly find the recipe they want.

I built this project to practice real-world full-stack development using React, Spring Boot, and MySQL, while also implementing features like image upload, JWT authentication, and dynamic UI interactions.

 Features
 Recipe Features

Add recipes with:

Title

Description / Ingredients

Category (Veg, Non-Veg, Dessert, Snacks, etc.)

Preparation time (Hours + Minutes)

Image upload

View recipes in a clean card layout

Delete recipes when needed

 Interaction Features

Like a recipe (stored in database)

Add comments

View all existing comments inside the recipe card

 Search & Filters

Search recipes by title

Filter by category

Filter by preparation time

Smooth UI that hides the image when viewing ingredients

 Tech Stack
Frontend (React)

React JS

React Hooks

React Router

Fetch API

Modern UI with inline & custom styling

Backend (Spring Boot)

Spring Boot

Spring Data JPA + Hibernate

MySQL

JWT Authentication

Multipart file upload (images)

API Endpoints (Simple Summary)
Method	Endpoint	Purpose
POST	/api/auth/register	User registration
POST	/api/auth/login	User login (JWT)
GET	/api/recipes	Get all recipes
POST	/api/recipes	Add a new recipe
GET	/api/recipes/{id}	Get recipe by ID
DELETE	/api/recipes/{id}	Delete a recipe
POST	/api/recipes/{id}/like	Like a recipe
POST	/api/recipes/{id}/comments	Add comment

 How to Run
Backend
cd recipe-backend
mvn spring-boot:run


Runs on:
http://localhost:8080

Frontend
cd recipe-backend/recipe-frontend
npm install
npm start


Runs on:
http://localhost:3000
