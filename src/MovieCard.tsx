import React from "react";

interface MovieCardProps {
  title: string;
  poster: string;
  rating: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, poster, rating }) => {
  return (
    <div style={{
      width: "200px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "10px",
      textAlign: "center"
    }}>
      <img 
        src={poster} 
        alt={title} 
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <h3>{title}</h3>
      <p>⭐ {rating}</p>
    </div>
  );
};

export default MovieCard;
