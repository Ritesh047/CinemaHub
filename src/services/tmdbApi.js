import axios from 'axios';

const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3'; // Base URL for TMDB API
const API_KEY = 'ce993c3f47e79d3c8afba611b131000a'; // Replace with your TMDB API key

// Helper function to create request URLs with API key
const getUrlWithParams = (path, params = {}) => {
  return `${TMDB_API_BASE_URL}${path}?api_key=${API_KEY}&${new URLSearchParams(params)}`;
};

// Function to fetch movies by genre
export const fetchMoviesByGenre = async (genreId) => {
  try {
    const response = await axios.get(getUrlWithParams('/discover/movie', { with_genres: genreId }));
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    throw error;
  }
};

// Function to fetch popular movies
export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(getUrlWithParams('/movie/popular'));
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

// Function to fetch upcoming movies
export const fetchUpcomingMovies = async () => {
  try {
    const response = await axios.get(getUrlWithParams('/movie/upcoming', { language: 'en-US' }));
    return response.data.results;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

// Function to fetch movie details
export const fetchMovieDetails = async (id) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_API_KEY`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
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
