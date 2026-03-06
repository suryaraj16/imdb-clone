import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import { searchMovies } from "./services/api";
import "./App.css";

function App() {

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debouncing
  useEffect(() => {

    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);

  }, [query]);

  // API call
  useEffect(() => {

    const fetchData = async () => {

      if (debouncedQuery === "") {
        setMovies([]);
        return;
      }

      const results = await searchMovies(debouncedQuery);
      setMovies(results);
    };

    fetchData();

  }, [debouncedQuery]);

  return (
    <div className="container">

      <h1>Movie Search</h1>

      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-bar"
      />

      {movies.length === 0 && debouncedQuery !== "" && (
        <p>No Results Found</p>
      )}

      <div className="movie-grid">

        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}

      </div>

    </div>
  );
}

export default App;
