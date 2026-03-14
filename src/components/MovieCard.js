import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition cursor-pointer">

        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full h-60 object-cover rounded"
        />

        <h3 className="font-bold mt-3">{movie.Title}</h3>

      </div>
    </Link>
  );
}

export default MovieCard;
