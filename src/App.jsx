import { useState } from "react";
import MovieCard from "./components/MovieCard";
import { searchMovies } from "./services/api";
import "./App.css";

function App() {

  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    const data = await searchMovies(query);
    setMovies(data);
  };

  return (
    <div className="container">

      <h1>IMDb Clone</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="movie-grid">
        {movies && movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

    </div>
  );
}

export default App;
