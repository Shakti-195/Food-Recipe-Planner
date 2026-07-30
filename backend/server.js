const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
require("dotenv").config();

// console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("API Key:", process.env.CLOUDINARY_API_KEY);
const connectDb=require("./config/connectionDb")
const cors = require("cors")

const PORT = process.env.PORT || 3000
connectDb()
app.use(express.json())
app.use(cors())
app.use(express.static("public"))

app.use("/",require("./routes/user"))
app.use("/recipe",require("./routes/recipe"))

app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`)
})