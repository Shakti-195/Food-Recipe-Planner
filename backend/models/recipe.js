const mongoose = require("mongoose")

const recipeSchema = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    ingredients:{
        type:String,
        require:true
    },
    instructions:{
        type:String,
        require:true
    },
    time:{
        type:String,
        
    },
    coverImage:{
        type:String,
        
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

module.exports=mongoose.model("Recipes",recipeSchema)