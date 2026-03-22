const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema({
  userEmail: String,
  movieId: String,
  title: String,
});

module.exports = mongoose.model("Watchlist", watchlistSchema);
