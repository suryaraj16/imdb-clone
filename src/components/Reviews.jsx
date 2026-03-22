import { useEffect, useState } from "react";
import axios from "axios";

export default function Reviews({ movieId }) {
  const [data, setData] = useState({
    reviews: [],
    avgRating: 0,
  });

  const fetchReviews = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/reviews/${movieId}`
    );
    setData(res.data);
  };

  useEffect(() => {
    fetchReviews();
  }, [movieId]);

  return (
    <div className="mt-4">
      <h2>⭐ Avg Rating: {data.avgRating}</h2>

      {data.reviews.map((r) => (
        <div key={r._id} className="border p-2 mt-2">
          <strong>{r.username}</strong> - ⭐ {r.rating}
          <p>{r.comment}</p>
          <small>
            {new Date(r.createdAt).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}
