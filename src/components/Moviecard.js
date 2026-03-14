import React, { useState, useEffect } from "react";

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favs.some((m) => m.id === movie.id));
  }, [movie.id]);

  const toggleFavorite = () => {
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      favs = favs.filter((m) => m.id !== movie.id);
    } else {
      favs.push(movie);
    }

    localStorage.setItem("favorites", JSON.stringify(favs));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition">
      <h3 className="font-bold text-lg">{movie.title}</h3>

      <button
        onClick={toggleFavorite}
        className="text-2xl mt-2"
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </div>
  );
}

export default MovieCard;
