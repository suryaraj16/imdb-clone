const API_KEY = "f5ea337c";
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query) => {

  const response = await fetch(
    `${BASE_URL}?s=${query}&apikey=${API_KEY}`
  );

  const data = await response.json();

  return data.Search || [];
};
