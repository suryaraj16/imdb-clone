import { useState } from "react";
import axios from "axios";

export default function ReviewForm({ movieId, refresh }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");

  const submitReview = async () => {
    if (!username) {
      alert("Enter username");
      return;
    }

    await axios.post("http://localhost:5000/api/reviews", {
      movieId,
      username,
      rating,
      comment,
    });

    setComment("");
    refresh();
  };

  return (
    <div className="p-4 border mt-4">
      <h3>Add Review</h3>

      <input
        placeholder="Your Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br />

      <input
        type="number"
        min="1"
        max="10"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <br />

      <textarea
        placeholder="Write review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <br />

      <button onClick={submitReview}>Submit</button>
    </div>
  );
}
