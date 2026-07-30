# 🍽️ Food Recipe Planner

A modern full-stack Food Recipe Planner built using the MERN stack. Users can securely register, log in, create recipes with images, manage their own recipes, save favourites, and explore delicious dishes through a clean and responsive interface.

---

## 🚀 Features

### Authentication
- 🔐 User Signup & Login
- 🔑 JWT Authentication
- 🔒 Protected API Routes
- 🔓 Logout Functionality

### Recipe Management
- 🍲 Add New Recipes
- ✏️ Edit Recipes
- 🗑️ Delete Recipes
- 📷 Upload Recipe Images
- 👤 View Your Own Recipes

### User Experience
- ❤️ Save Favourite Recipes
- 📱 Fully Responsive Design
- ⚡ Fast Loading with Vite
- 🎨 Clean and Modern UI
- 🍴 Recipe Details Page

---

# 🛠️ Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- Vite
- CSS3
- React Icons

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Multer
- Dotenv
- CORS

---

# 📂 Project Structure

```
Food Recipe Planner
│
├── backend
│   ├── config
│   ├── controller
│   ├── middleware
│   ├── models
│   ├── public
│   │   └── images
│   ├── routes
│   ├── .env
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
│       ├── package.json
│       └── vite.config.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/your-github-username/Food-Recipe-Planner.git
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
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key
```

Run backend

```bash
npm start
```

Backend runs on

```
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend/food-blog-app
npm install
```

Run frontend

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 📸 Application Screens

Include screenshots of:

- 🏠 Home Page
- 🔑 Login
- 📝 Signup
- ➕ Add Recipe
- ❤️ Favourite Recipes
- 👤 My Recipes
- 🍲 Recipe Details

---

# 🔒 Authentication Flow

- User signs up
- Password is hashed using Bcrypt
- JWT token generated after login
- Token stored in Local Storage
- Protected routes verify JWT before allowing access

---

# 📦 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/user/signup` | Register User |
| POST | `/user/login` | Login User |
| GET | `/user/:id` | Get User |

## Recipes

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/recipe` | Get All Recipes |
| GET | `/recipe/:id` | Get Single Recipe |
| POST | `/recipe` | Add Recipe |
| PUT | `/recipe/:id` | Update Recipe |
| DELETE | `/recipe/:id` | Delete Recipe |

---

# ✨ Future Enhancements

- ⭐ Recipe Ratings
- 💬 Comments
- 🔍 Search Recipes
- 🏷️ Categories
- 🌙 Dark Mode
- 📊 User Dashboard
- 📤 Share Recipes
- 🍽️ Meal Planner
- 🔖 Bookmark Recipes
- 🤖 AI Recipe Suggestions

---

# 🤝 Contributing

Contributions are welcome.

1. Fork this repository

2. Create a branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 👨‍💻 Author

### Shakti Singh

🎓 B.Tech Computer Science Engineering

💻 Full Stack Developer

🚀 Passionate about MERN Stack Development

📧 Feel free to connect and contribute!

---

# ⭐ Show Your Support

If you liked this project, don't forget to ⭐ star this repository.

It motivates me to build more open-source projects.

---

## 📄 License

This project is licensed under the **MIT License**.

---

**Made with ❤️ by Shakti Singh ❤️**