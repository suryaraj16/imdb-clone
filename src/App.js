import { useState } from "react";
import Auth from "./components/Auth";
import { db } from "../firebase";
import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

function App() {
  const [user, setUser] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState([]);
const [genre, setGenre] = useState("");
const [sort, setSort] = useState("");
const [year, setYear] = useState("");

  if (!user) {
    return <Auth setUser={setUser} />;
  }

  return (
    <div>
      <h2>Welcome {user.email}</h2>

      {/* your movie app here */}
    </div>
  );
}


