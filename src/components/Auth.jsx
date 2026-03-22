import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function Auth({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    const res = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    setUser(res.user);
  };

  const login = async () => {
    const res = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    setUser(res.user);
  };

  return (
    <div>
      <h2>Login / Signup</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>
      <button onClick={signup}>Signup</button>
    </div>
  );
}
