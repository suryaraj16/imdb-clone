const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// ➤ Add Review
router.post("/", async (req, res) => {
  try {
    const { movieId, username, rating, comment } = req.body;

    const review = new Review({
      movieId,
      username,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ➤ Get Reviews + Avg Rating
router.get("/:movieId", async (req, res) => {
  try {
    const reviews = await Review.find({
      movieId: req.params.movieId,
    }).sort({ createdAt: -1 });

    const avg =
      reviews.reduce((acc, r) => acc + r.rating, 0) /
      (reviews.length || 1);

    res.json({
      reviews,
      avgRating: avg.toFixed(1),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
