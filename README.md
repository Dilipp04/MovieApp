﻿# 🎬 MERN Stack Movie Application

## 📌 Overview

This is a full-stack movie web application that allows users to browse IMDb’s Top 250 movies, search, and sort movies. Admins can add, edit, and delete movie records with role-based authentication.

## 🚀 Features

### 👤 User Features

- View movie details fetched from IMDb’s Top 250 Movies.
- Search movies by **name** or **description**.
- Sort movies by **name, rating, release date, and duration**.

### 🛠️ Admin Features

- Add new movie details.
- Edit or delete existing movies.

## 🏗️ Tech Stack

### Frontend:

- **Framework**: React.js
- **UI Library**: Material-UI , Tailwind Css
- **State Management**: Context API
- **Routing**: React Router DOM

### Backend:

- **Framework**: Node.js with Express.js
- **Database**: MongoDB (MongoDB Atlas)
- **Authentication**: JWT (JSON Web Token)

## 📌 Installation & Setup

### 1️⃣ Clone the repository:

```sh
git clone https://github.com/Dilipp04/MovieApp.git
cd MovieApp
```

### 2️⃣ Backend Setup:

```sh
cd backend
npm install
npm start
```

### 3️⃣ Frontend Setup:

```sh
cd frontend
npm install
npm start
```

## 🔌 API Endpoints

### 🎥 Movie Endpoints:

- `GET /movies` → Retrieve all movies
- `GET /movies/sorted` → Get sorted movies (by name, rating, release date, duration)
- `GET /movies/search` → Search movies by name or description
- `POST /movies` → Add a new movie (Admin only)
- `PUT /movies/:id` → Edit movie details (Admin only)
- `DELETE /movies/:id` → Delete a movie (Admin only)

## 🔐 Authentication & Authorization

- JWT-based authentication for user login.
- Role-based access control for admin functionalities.

## 🌍 Deployment

- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on Vercel
- **Database**: Hosted on MongoDB Atlas.
