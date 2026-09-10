const express = require("express");
const router = express.Router();

const {userLogin,userSignUp,getUser,updateProfile,addFavourites,removeFavourites,getFavourites} = require("../controller/user");

const verifyToken = require("../middleware/auth");

// Auth
router.post("/signUp", userSignUp);
router.post("/login", userLogin);

// Favourites
router.get("/user/favourites", verifyToken, getFavourites);
router.post("/user/favourites/:recipeId", verifyToken, addFavourites);
router.delete("/user/favourites/:recipeId", verifyToken, removeFavourites);

// User
router.get("/user/:id", getUser);
router.put("/user/profile", verifyToken, updateProfile);

module.exports = router;