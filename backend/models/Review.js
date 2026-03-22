const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    movieId: {
      type: String,
      required: true,
    },
    username: String,
    rating: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    comment: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
