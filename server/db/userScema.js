const mongoose = require("mongoose");

const userScema = new mongoose.Schema(
  {
    rollNo: {
      type: Number,
      
    },
    Name: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userScema);
module.exports = User;
