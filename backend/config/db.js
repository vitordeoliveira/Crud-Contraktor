const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

// CHANGE TO LOCALSERVER - "mongoURI": "mongodb://localhost:27017/myproject"
const connectDB = async () => {
  try {
    mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
