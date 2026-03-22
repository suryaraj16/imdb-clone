import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import ReviewForm from "./components/ReviewForm";
import Reviews from "./components/Reviews";
import WatchlistButton from "./components/WatchlistButton";

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = { uid: "123", email: "user@test.com" };

  const [year, setYear] = useState("");
  const [sort, setSort] = useState("");

  // 🎬 Fetch movies
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY"
      )
      .then((res) => {
        setMovies(res.data.results);
        setFilteredMovies(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // 🎯 Filters
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

  // 📺 LIST PAGE
  if (!selectedMovie) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>🎬 Movies</h1>

        {/* Filters */}
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

        {/* 🔥 SKELETON LOADING */}
        {loading
          ? Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  style={{
                    border: "1px solid gray",
                    padding: "10px",
                    margin: "10px",
                  }}
                >
                  <Skeleton height={20} width={200} />
                  <Skeleton height={15} width={100} />
                </div>
              ))
          : filteredMovies.map((movie) => (
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

  // 🎥 DETAILS PAGE
  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => setSelectedMovie(null)}>⬅ Back</button>

      <h1>{selectedMovie.title}</h1>

      {/* 🔥 LAZY IMAGE */}
      <img
        loading="lazy"
        src={`https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`}
        alt={selectedMovie.title}
      />

      <p>{selectedMovie.overview}</p>

      <WatchlistButton user={user} movie={selectedMovie} />

      <ReviewForm
        movieId={selectedMovie.id}
        refresh={() => window.location.reload()}
      />
      <Reviews movieId={selectedMovie.id} />
    </div>
  );
}

export default App;
