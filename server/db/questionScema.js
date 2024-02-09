const mongoose = require("mongoose");

const questionScema = new mongoose.Schema(
  {
    question: {
      type: String,
    },
    A: {
      type: String,
    },
    B: {
      type: String,
    },
    C: {
      type: String,
    },
    D: {
      type: String,
    },
    answer: {
      type: String,
    },
  },
  { timestamps: true }
);

const question = mongoose.model("question", questionScema);
module.exports = question;
