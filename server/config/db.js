const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const mongodbURI = process.env.MONGODB_URI;

        if (!mongodbURI) {
            throw new Error("MONGODB_URI environment variable not set");
        }

        await mongoose.connect(mongodbURI);

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

module.exports = connectDB;