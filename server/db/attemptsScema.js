const mongoose = require("mongoose");

const attemptScema = new mongoose.Schema(
  {
    rollNO: {
      type: String,
      
    },
    attempts: {
      type: number,
      default:0
    },
    score: {
      type: Number,
    }
  },
  { timestamps: true }
);

const Attempt = mongoose.model("User", attemptScema);
module.exports = Attempt;
