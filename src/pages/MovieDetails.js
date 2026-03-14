import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = "YOUR_API_KEY";

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);

      const res = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
      );

      const data = await res.json();

      setMovie(data);
      setLoading(false);
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading movie details...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">

      <div className="grid md:grid-cols-2 gap-6">

        <img
          src={movie.Poster}
          alt={movie.Title}
          className="rounded shadow-lg"
        />

        <div>
          <h1 className="text-3xl font-bold">{movie.Title}</h1>

          <p className="mt-2"><b>Genre:</b> {movie.Genre}</p>
          <p><b>Cast:</b> {movie.Actors}</p>
          <p><b>Rating:</b> ⭐ {movie.imdbRating}</p>

          <p className="mt-4"><b>Plot:</b></p>
          <p>{movie.Plot}</p>

        </div>

      </div>

    </div>
  );
}

export default MovieDetails;
