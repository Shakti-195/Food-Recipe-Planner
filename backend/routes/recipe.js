const express=require("express")
const { getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,addRating,upload} = require("../controller/recipe")
const verifyToken = require("../middleware/auth")
const router=express.Router()

router.get("/",getRecipes) //Get all recipes
router.get("/:id",getRecipe) //Get recipe by id
router.post("/:id/rating", verifyToken, addRating);
//add recipe
router.post("/", (req, res, next) => {
    upload.single("file")(req, res, function (err) {
        if (err) {
            console.error("UPLOAD ERROR:", err);
            return res.status(500).json({
                message: err.message,
                stack: err.stack,
            });
        }
        next();
    });
}, verifyToken, addRecipe); 

router.put("/:id",upload.single('file'),editRecipe) //Edit recipe
router.delete("/:id",deleteRecipe) //Delete recipe

module.exports=router