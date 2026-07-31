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

const User = require("../models/user");

const addComment = async (req, res) => {
  try {
 
    const { comment, rating } = req.body;
    console.log("Request Body:", req.body);
    console.log("Rating:", req.body.rating);

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

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    console.log("Comment:", comment);
    console.log("Rating:", rating);

  const review = {
  userId: user._id,
  userName: user.email,
  rating,
  comment,
};

console.log("Review Object:", review);

recipe.comments.push(review);

console.log(
  "Last Comment Before Save:",
  recipe.comments[recipe.comments.length - 1]
);

await recipe.save();


console.log(
  "Last Comment After Save:",
  recipe.comments[recipe.comments.length - 1]
);

    await recipe.save();

    return res.status(200).json({
      message: "Comment added successfully",
      comments: recipe.comments,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateComment = async (req, res) => {
  try {
    const { recipeId, commentId } = req.params;
    const { comment, rating } = req.body;

    const recipe = await Recipes.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    const review = recipe.comments.id(commentId);

    if (!review) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    // Only owner can edit
    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can edit only your own review",
      });
    }

    // Update comment
    review.comment = comment;

    // Update rating inside comment
    review.rating = rating;

    // Update rating inside ratings array
    const existingRating = recipe.ratings.find(
      (item) => item.userId.toString() === req.user.id
    );

    if (existingRating) {
      existingRating.rating = rating;
    }

    await recipe.save();

    res.status(200).json({
      message: "Review updated successfully",
      recipe,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};
const deleteComment = async (req, res) => {
  try {
    const { recipeId, commentId } = req.params;

    const recipe = await Recipes.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    const review = recipe.comments.id(commentId);

    if (!review) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    // Only owner can delete
    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can delete only your own review",
      });
    }

    // Delete comment
    recipe.comments.pull(commentId);

    // Delete rating of same user
    recipe.ratings = recipe.ratings.filter(
      (item) => item.userId.toString() !== req.user.id
    );

    await recipe.save();

    res.status(200).json({
      message: "Review deleted successfully",
      recipe,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};
module.exports={getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,addRating, addComment, updateComment,deleteComment,upload}