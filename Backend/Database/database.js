// database connection file

const mongoose = require("mongoose");

const URI = "mongodb://127.0.0.1:27017/merndb";
const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("MongoDB connected...");
  } catch (error) {
    console.log("Error connecting to MongoDB");
  }
};
module.exports = connectDb;
