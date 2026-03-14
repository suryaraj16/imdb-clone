import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <BrowserRouter>

      <nav className="p-4 bg-gray-200 flex gap-5">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;

}

export default App;

