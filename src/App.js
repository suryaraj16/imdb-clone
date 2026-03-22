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


