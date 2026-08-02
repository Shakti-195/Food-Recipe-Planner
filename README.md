<div align="center">

# 🍽️ RecipeVerse

### A full-stack recipe planner built with React, Node.js, Express, MongoDB, and Cloudinary

RecipeVerse lets users browse recipes, create and manage their own recipes, save favorites, and leave ratings and comments.

<br>

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)]()

</div>

---

# 🌐 Live Demo

You can try the deployed app here:

- Frontend: https://food-recipe-planner.vercel.app/
- Backend API: https://food-recipe-planner.onrender.com/

These links are also useful for testing the live UI and API endpoints.

---

# ✨ What the app does

RecipeVerse is a modern recipe management app with:

- user signup and login
- JWT-based authentication
- recipe creation, editing, and deletion
- image uploads through Cloudinary
- favorites management
- recipe ratings and comments
- search and browsing across recipes
- a responsive UI built with React and Vite

---

# 🛠 Tech stack

## Frontend
- React 19
- Vite
- React Router DOM
- Axios
- React Hot Toast
- React Icons
- Tailwind CSS v4

## Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT
- Bcrypt
- Multer + Cloudinary storage
- CORS

---

# 📂 Project structure

```text
Food-Recipe-Planner/
├── backend/
│   ├── config/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── public/
│   ├── server.js
│   └── package.json
├── frontend/
│   └── food-blog-app/
│       ├── public/
│       ├── src/
│       │   ├── assets/
│       │   ├── components/
│       │   ├── Pages/
│       │   ├── App.jsx
│       │   ├── App.css
│       │   └── main.jsx
│       ├── package.json
│       ├── vite.config.js
│       └── eslint.config.js
└── README.md
```

---

# 🚀 Getting started

## 1) Clone the repository

```bash
git clone https://github.com/Shakti-195/Food-Recipe-Planner.git
cd Food-Recipe-Planner
```

## 2) Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```env
PORT=5000
CONNECTION_STRING=YOUR_MONGODB_URI
SECRET_KEY=YOUR_SECRET_KEY
CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET
```

Run the backend:

```bash
npm run dev
```

## 3) Frontend setup

```bash
cd ../frontend/food-blog-app
npm install
npm run dev
```



---

# 🔐 Authentication and user flow

Users can:

- sign up for an account
- log in securely
- access protected routes through JWT
- save favorite recipes
- manage their own recipes

---

# 🌐 API overview

## Auth

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /signUp | Register a user |
| POST | /login | Log in a user |
| GET | /user/:id | Get user details |

## Favorites

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /user/favourites | Get favorite recipes |
| POST | /user/favourites/:recipeId | Add to favorites |
| DELETE | /user/favourites/:recipeId | Remove from favorites |

## Recipes

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /recipe | Get all recipes |
| GET | /recipe/:id | Get one recipe |
| POST | /recipe | Create a new recipe |
| POST | /recipe/:id/rating | Rate a recipe |
| POST | /recipe/:id/comment | Add a comment |
| PUT | /recipe/:id | Edit a recipe |
| DELETE | /recipe/:id | Delete a recipe |
| PUT | /recipe/:recipeId/comment/:commentId | Edit a review |
| DELETE | /recipe/:recipeId/comment/:commentId | Delete a review |

---

# 📸 Screenshots

The project includes a dedicated screenshots folder with previews for the main UI flows and pages.

You can view the available images here:
- [screenshots/HomeRecipes.jpeg](screenshots/HomeRecipes.jpeg)
- [screenshots/login.jpeg](screenshots/login.jpeg)
- [screenshots/signup.jpeg](screenshots/signup.jpeg)
- [screenshots/herosection.jpeg](screenshots/herosection.jpeg)
- [screenshots/favourites.jpeg](screenshots/favourites.jpeg)
- [screenshots/myrecipes.jpeg](screenshots/myrecipes.jpeg)
- [screenshots/comment1.jpeg](screenshots/comment1.jpeg)
- [screenshots/comment2.jpeg](screenshots/comment2.jpeg)
- [screenshots/404.jpeg](screenshots/404.jpeg)

The app source code is available in [backend](backend) and [frontend/food-blog-app](frontend/food-blog-app).

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push the branch and open a pull request

---

# 👨‍💻 Author

Shakti Singh

- GitHub: https://github.com/Shakti-195
- LinkedIn: https://www.linkedin.com/in/shakti-singh-b9b6ba2a6/

---

# 📄 License

This project is licensed under the MIT License.
