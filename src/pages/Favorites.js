import React, { useEffect, useState } from "react";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(fav);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5">Favorite Movies</h1>

      {favorites.length === 0 && <p>No favorites yet</p>}

      <div className="grid md:grid-cols-3 gap-6">
        {favorites.map((movie) => (
          <div key={movie.id} className="bg-white shadow p-4 rounded">
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
