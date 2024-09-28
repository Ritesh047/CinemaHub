import axios from 'axios';

const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3'; // Base URL for TMDB API
const API_KEY = 'ce993c3f47e79d3c8afba611b131000a'; // Replace with your TMDB API key

// Helper function to create request URLs with API key
const getUrlWithParams = (path, params = {}) => {
  return `${TMDB_API_BASE_URL}${path}?api_key=${API_KEY}&${new URLSearchParams(params).toString()}`;
};

// Function to fetch movies by genre
export const fetchMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await axios.get(getUrlWithParams('/discover/movie', { with_genres: genreId, page }));
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    throw error;
  }
};

// Function to fetch popular movies
export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await axios.get(getUrlWithParams('/movie/popular', { page }));
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

// Function to fetch upcoming movies
export const fetchUpcomingMovies = async (page = 1) => { // Added page parameter for consistency
  try {
    const response = await axios.get(getUrlWithParams('/movie/upcoming', { language: 'en-US', page }));
    return response.data.results;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

// Function to fetch movie details
export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(getUrlWithParams(`/movie/${id}`));
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

// Function to fetch genres
export const fetchGenres = async () => {
  try {
    const response = await axios.get(getUrlWithParams('/genre/movie/list'));
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};

// Function to fetch movies by search term
export const fetchMoviesBySearch = async (searchTerm) => {
  try {
    const response = await axios.get(getUrlWithParams('/search/movie', {
      query: searchTerm,
      page: 1,
      include_adult: false,
    }));
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies by search:", error);
    throw error;
  }
};
