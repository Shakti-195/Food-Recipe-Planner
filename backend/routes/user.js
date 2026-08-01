const express=require("express")
const router = express.Router();

const {userLogin,userSignUp,getUser,addFavorite,removeFavorite,getFavorites}=require("../controller/user")
const verifyToken = require("../middleware/auth");

router.post("/signUp",userSignUp)
router.post("/login",userLogin)
router.get("/user/:id",getUser)


router.post("/user/favorites/:recipeId", verifyToken, addFavorite);
router.delete("/user/favorites/:recipeId", verifyToken, removeFavorite);
router.get("/user/favorites", verifyToken, getFavorites);

module.exports=router