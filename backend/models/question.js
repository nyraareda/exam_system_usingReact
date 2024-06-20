const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctOption: { type: Number, required: true }
});

module.exports = mongoose.model('Question', questionSchema); // Export the model only once
