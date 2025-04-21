const mongoose = require("mongoose");

// Define the Feedback schema
const feedbackSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  pitchTitle: {
    type: String,
    required: true,
  },
  feedbackText: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the model
module.exports = mongoose.model("Feedback", feedbackSchema);
