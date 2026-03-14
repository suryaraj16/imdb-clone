import MovieDetails from "./pages/MovieDetails";

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/movie/:id" element={<MovieDetails />} />
  <Route path="/favorites" element={<Favorites />} />
</Routes>


