const express=require("express")
const { getRecipes,getRecipe,getMyRecipeCount,getMyRatingCount,addRecipe,editRecipe,deleteRecipe,addRating, addComment,updateComment,deleteComment,upload} = require("../controller/recipe")
const verifyToken = require("../middleware/auth")
const router=express.Router()

router.get("/",getRecipes) //Get all recipes
router.get("/my/count", verifyToken, getMyRecipeCount);
router.get("/my/ratings/count", verifyToken, getMyRatingCount);
router.get("/:id",getRecipe) //Get recipe by id
router.post("/:id/rating", verifyToken, addRating);
router.post("/:id/comment", verifyToken, addComment);
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
router.put(
    "/:recipeId/comment/:commentId",
    verifyToken,
    updateComment
);

router.delete(
    "/:recipeId/comment/:commentId",
    verifyToken,
    deleteComment
);

module.exports=router