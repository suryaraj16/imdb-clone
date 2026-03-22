import MovieDetails from "./pages/MovieDetails";
import ReviewForm from "./components/ReviewForm";
import Reviews from "./components/Reviews";

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/movie/:id" element={<MovieDetails />} />
  <Route path="/favorites" element={<Favorites />} />
</Routes>


