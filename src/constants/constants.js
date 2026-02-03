export const baseUrl = 'https://api.themoviedb.org/3';
export const API_KEY = '94e01c00eb63f1ea9d2f36403be71022';
export const imageUrl = 'https://image.tmdb.org/t/p/original';
export const searchMovieUrl = (query) =>
  `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
export const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};
