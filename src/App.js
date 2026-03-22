import { useEffect, useState } from "react";
import axios from "axios";
import ReviewForm from "./components/ReviewForm";
import Reviews from "./components/Reviews";
import WatchlistButton from "./components/WatchlistButton";

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // 🔐 Fake user (replace with your Firebase user if needed)
  const user = { uid: "123", email: "user@test.com" };

  // 🎯 Filters
  const [year, setYear] = useState("");
  const [sort, setSort] = useState("");

  // 🎬 Fetch Movies
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY"
      )
      .then((res) => {
        setMovies(res.data.results);
        setFilteredMovies(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  // 🎯 Apply Filters
  useEffect(() => {
    let data = [...movies];

    if (year) {
      data = data.filter(
        (m) => m.release_date && m.release_date.startsWith(year)
      );
    }

    if (sort === "rating") {
      data.sort((a, b) => b.vote_average - a.vote_average);
    } else if (sort === "newest") {
      data.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      );
    } else if (sort === "popularity") {
      data.sort((a, b) => b.popularity - a.popularity);
    }

    setFilteredMovies(data);
  }, [year, sort, movies]);

  // 📺 MOVIE LIST PAGE
  if (!selectedMovie) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>🎬 Movies</h1>

        {/* 🔥 FILTER UI */}
        <div style={{ marginBottom: "20px" }}>
          <select onChange={(e) => setYear(e.target.value)}>
            <option value="">All Years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>

          <select onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort</option>
            <option value="popularity">Popularity</option>
            <option value="newest">Newest</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* 🎬 MOVIE LIST */}
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              margin: "10px",
              cursor: "pointer",
            }}
            onClick={() => setSelectedMovie(movie)}
          >
            <h3>{movie.title}</h3>
            <p>⭐ {movie.vote_average}</p>
          </div>
        ))}
      </div>
    );
  }

  // 🎥 MOVIE DETAILS PAGE
  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => setSelectedMovie(null)}>⬅ Back</button>

      <h1>{selectedMovie.title}</h1>

      <img
        src={`https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`}
        alt={selectedMovie.title}
      />

      <p>{selectedMovie.overview}</p>

      {/* ⭐ WATCHLIST BUTTON */}
      <WatchlistButton user={user} movie={selectedMovie} />

      {/* ⭐ REVIEW SYSTEM */}
      <ReviewForm
        movieId={selectedMovie.id}
        refresh={() => window.location.reload()}
      />
      <Reviews movieId={selectedMovie.id} />
    </div>
  );
}

export default App;
