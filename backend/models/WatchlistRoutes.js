const express = require("express");
const router = express.Router();
const Watchlist = require("../models/Watchlist");

// ➤ Add to watchlist
router.post("/", async (req, res) => {
  const { userEmail, movieId, title } = req.body;

  const item = new Watchlist({
    userEmail,
    movieId,
    title,
  });

  await item.save();
  res.json(item);
});

// ➤ Get watchlist
router.get("/:email", async (req, res) => {
  const data = await Watchlist.find({
    userEmail: req.params.email,
  });
  res.json(data);
});

module.exports = router;
