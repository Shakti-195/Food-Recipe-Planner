const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDb;