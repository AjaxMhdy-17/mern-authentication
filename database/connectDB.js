const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.LocalDB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    });
    console.log("DATABASE CONNECTED");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
