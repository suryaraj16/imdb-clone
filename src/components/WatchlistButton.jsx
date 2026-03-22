import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";

export default function WatchlistButton({ user, movie }) {
  const [added, setAdded] = useState(false);

  // ✅ Check already added
  useEffect(() => {
    const check = async () => {
      const ref = doc(db, "watchlist", `${user.uid}_${movie.id}`);
      const snap = await getDoc(ref);

      if (snap.exists()) setAdded(true);
    };

    check();
  }, [movie.id, user.uid]);

  // ✅ Add / Remove
  const toggleWatchlist = async () => {
    const ref = doc(db, "watchlist", `${user.uid}_${movie.id}`);

    if (added) {
      await deleteDoc(ref);
      setAdded(false);
    } else {
      await setDoc(ref, {
        userId: user.uid,
        movieId: movie.id,
        title: movie.title,
        poster: movie.poster_path,
      });
      setAdded(true);
    }
  };

  return (
    <button onClick={toggleWatchlist}>
      {added ? "✅ Added to Watchlist" : "⭐ Add to Watchlist"}
    </button>
  );
}
