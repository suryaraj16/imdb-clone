import { useEffect, useState } from "react";
import axios from "axios";
import ReviewForm from "./components/ReviewForm";
import Reviews from "./components/Reviews";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // 👉 Fetch movies (you can replace API if needed)
  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY")
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err));
  }, []);

  // 👉 If no movie selected → show list
  if (!selectedMovie) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Movies</h1>

        {movies.map((movie) => (
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
          </div>
        ))}
      </div>
    );
  }

  // 👉 Movie Details UI (THIS IS WHAT YOU NEED)
  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => setSelectedMovie(null)}>⬅ Back</button>

      <h1>{selectedMovie.title}</h1>

      <img
        src={`https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`}
        alt={selectedMovie.title}
      />

      <p>{selectedMovie.overview}</p>

      {/* 🔥 ADD REVIEW SYSTEM HERE */}
      <ReviewForm
        movieId={selectedMovie.id}
        refresh={() => window.location.reload()}
      />

      <Reviews movieId={selectedMovie.id} />
    </div>
  );
}

export default App;


