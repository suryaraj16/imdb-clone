import React from "react";
import MovieCard from "../components/MovieCard";

function Home({ movies }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 p-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default Home;
