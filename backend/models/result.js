const mongoose = require("mongoose");
const questionSchema = require("./question");
const resultSchema = new mongoose.Schema({
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  score: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Result", resultSchema);
