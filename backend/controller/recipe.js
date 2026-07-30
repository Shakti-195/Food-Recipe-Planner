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

module.exports={getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,upload}