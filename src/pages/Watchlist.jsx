import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Watchlist({ user }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(db, "watchlist"),
        where("userId", "==", user.uid)
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => doc.data());

      setList(data);
    };

    fetchData();
  }, [user.uid]);

  return (
    <div>
      <h2>Your Watchlist</h2>

      {list.map((m, i) => (
        <div key={i}>
          <p>{m.title}</p>
        </div>
      ))}
    </div>
  );
}
