# 🍽️ RecipeVerse – MERN Food Recipe Planner

A modern full-stack Recipe Management Web Application built using the **MERN Stack**. RecipeVerse allows users to securely create, manage, and discover recipes with features like authentication, favourites, ratings, reviews, and image uploads.

---

## 🌐 Live Demo

**Frontend:** https://food-recipe-planner.vercel.app/

**Backend API:** https://food-recipe-planner.onrender.com/

---

## ✨ Features

### 🔐 Authentication
- User Signup & Login
- JWT Authentication
- Protected Routes
- Secure Password Hashing using Bcrypt
- Logout Functionality

### 🍲 Recipe Management
- Add New Recipes
- Edit Existing Recipes
- Delete Recipes
- Upload Recipe Images
- View Recipe Details
- View My Recipes

### ⭐ Community Features
- Save Favourite Recipes
- Rate Recipes
- Add Reviews & Comments
- Search Recipes
- Responsive Design

### 🎨 User Experience
- Modern UI
- Mobile Friendly
- Fast Loading with Vite
- Custom 404 Page
- Responsive Navigation

---

# 🛠️ Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Vite
- React Icons
- CSS3

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- Bcrypt
- Multer
- Dotenv
- CORS

---

# 📂 Project Structure

```text
Food-Recipe-Planner
│
├── backend
│   ├── config
│   ├── controller
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── public
│   ├── server.js
│   └── package.json
│
├── frontend
│   └── food-blog-app
│       ├── public
│       ├── src
│       │   ├── assets
│       │   ├── components
│       │   ├── Pages
│       │   ├── App.jsx
│       │   └── main.jsx
│       ├── vite.config.js
│       └── package.json
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Food-Recipe-Planner.git
```

```bash
cd Food-Recipe-Planner
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

```env
PORT=5000
CONNECTION_STRING=YOUR_MONGODB_CONNECTION_STRING
SECRET_KEY=YOUR_SECRET_KEY
```

Run Backend

```bash
npm start
```

---

## Frontend Setup

```bash
cd frontend/food-blog-app
npm install
```

Run Frontend

```bash
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 🔐 Authentication Flow

```
User
   │
Signup / Login
   │
Password Hashing (Bcrypt)
   │
JWT Token Generated
   │
Stored in Local Storage
   │
Protected API Routes
```

---

# 📦 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/user/signup` | Register User |
| POST | `/user/login` | Login User |
| GET | `/user/:id` | Get User Details |

---

## Favourites

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/user/favourites` | Get Favourite Recipes |
| POST | `/user/favourites/:recipeId` | Add Favourite |
| DELETE | `/user/favourites/:recipeId` | Remove Favourite |

---

## Recipes

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/recipe` | Get All Recipes |
| GET | `/recipe/:id` | Get Single Recipe |
| POST | `/recipe` | Create Recipe |
| PUT | `/recipe/:id` | Update Recipe |
| DELETE | `/recipe/:id` | Delete Recipe |

---

# 📸 Screenshots

> Add screenshots of your application here.

- 🏠 Home Page
- 🔐 Login
- 📝 Signup
- ➕ Add Recipe
- ❤️ Favourite Recipes
- 👤 My Recipes
- 🍲 Recipe Details
- ⭐ Reviews & Ratings
- 📱 Mobile View

---

# 🚀 Future Enhancements

- Recipe Categories
- Dark Mode
- User Profile
- Recipe Collections
- Cooking Timer
- AI Recipe Suggestions
- Share Recipes
- Infinite Scroll
- Recipe Recommendation System
- Recipe Challenge Mini Game

---

# 🤝 Contributing

Contributions, feature requests, and suggestions are welcome.

1. Fork this repository

2. Create your feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push your branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 👨‍💻 Author

## Shakti Singh

🎓 B.Tech Computer Science Engineering

💻 Full Stack Developer

🚀 Passionate about MERN Stack Development

### Connect with me

- GitHub: https://github.com/Shakti-195
- LinkedIn: https://www.linkedin.com/in/shakti-singh-b9b6ba2a6/


---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

Your support motivates me to build more open-source projects.

---

# 📄 License

This project is licensed under the **MIT License**.

---

<p align="center">
Made with ❤️ by <b>Shakti Singh</b>
</p>