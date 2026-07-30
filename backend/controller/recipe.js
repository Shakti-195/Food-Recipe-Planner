const Recipes=require("../models/recipe")


const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const path = require("path");

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
        folder: "food-recipe-planner",
        resource_type: "image",
        public_id: Date.now() + "-" + path.parse(file.originalname).name,
    }),
});

const upload = multer({ storage });

const getRecipes=async(req,res)=>{
    const recipes=await Recipes.find()
    return res.json(recipes)
}

const getRecipe=async(req,res)=>{
    const recipe=await Recipes.findById(req.params.id)
    res.json(recipe)
}

const addRecipe = async (req, res) => {
    try {
        console.log("Body:", req.body);
        console.log("File:", req.file);
        console.log("User:", req.user);

        const { title, ingredients, instructions, time } = req.body;

        const newRecipe = await Recipes.create({
            title,
            ingredients,
            instructions,
            time,
            coverImage: req.file.path,
            createdBy: req.user.id
        });

        return res.json(newRecipe);
    } catch (err) {
        console.error("ERROR:", err);
        return res.status(500).json({ message: err.message });
    }
};

const editRecipe = async (req, res) => {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    try {
        const recipe = await Recipes.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        let coverImage = req.file?.path || recipe.coverImage;

        const updatedRecipe = await Recipes.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                coverImage,
            },
            { new: true }
        );

        return res.json(updatedRecipe);

    } catch (err) {
        console.error("EDIT ERROR:", err);
        return res.status(500).json({
            message: err.message,
        });
    }
};
const deleteRecipe=async(req,res)=>{
    try{
        await Recipes.deleteOne({_id:req.params.id})
        res.json({status:"ok"})
    }
    catch(err){
        return res.status(400).json({message:"error"})
    }
}

const addRating = async (req, res) => {
    try {
        const { rating } = req.body;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({
                message: "Rating must be between 1 and 5",
            });
        }

        const recipe = await Recipes.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found",
            });
        }

        // Check if this user has already rated
        const existingRating = recipe.ratings.find(
            (item) => item.userId.toString() === req.user.id
        );

        if (existingRating) {
            existingRating.rating = rating;
        } else {
            recipe.ratings.push({
                userId: req.user.id,
                rating,
            });
        }

        await recipe.save();

        const totalRatings = recipe.ratings.length;

        const averageRating =
            recipe.ratings.reduce((sum, item) => sum + item.rating, 0) /
            totalRatings;

        return res.json({
            message: "Rating submitted successfully",
            averageRating: Number(averageRating.toFixed(1)),
            totalRatings,
        });
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: err.message,
        });
    }
};

const addComment = async (req, res) => {
  try {
    const { comment } = req.body;

    if (!comment || comment.trim() === "") {
      return res.status(400).json({
        message: "Comment cannot be empty",
      });
    }

    const recipe = await Recipes.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    recipe.comments.push({
      userId: req.user.id,
      userName: req.user.name,
      comment,
    });

    await recipe.save();

    res.status(200).json({
      message: "Comment added successfully",
      comments: recipe.comments,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports={getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,addRating, addComment,upload}