const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb://127.0.0.1:27017/ticketing",
    );

    console.log("DB connected");
  } catch (e) {
    console.error(e.message);
    process.exit(1); // Stopping the server
  }
};

module.exports = connectDB;
