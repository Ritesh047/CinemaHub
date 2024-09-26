// movieActions.js
import { fetchPopularMovies, fetchMovieDetails, fetchGenres, fetchMoviesByGenre } from '../../services/tmdbApi';

// Action Types
export const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';

export const FETCH_MOVIE_DETAILS_REQUEST = 'FETCH_MOVIE_DETAILS_REQUEST';
export const FETCH_MOVIE_DETAILS_SUCCESS = 'FETCH_MOVIE_DETAILS_SUCCESS';
export const FETCH_MOVIE_DETAILS_FAILURE = 'FETCH_MOVIE_DETAILS_FAILURE';

export const FETCH_GENRES_REQUEST = 'FETCH_GENRES_REQUEST';
export const FETCH_GENRES_SUCCESS = 'FETCH_GENRES_SUCCESS';
export const FETCH_GENRES_FAILURE = 'FETCH_GENRES_FAILURE';
  
// Action to fetch movies
export const fetchMovies = (genreId = null) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_MOVIES_REQUEST });
    try {
      const movies = genreId ? await fetchMoviesByGenre(genreId) : await fetchPopularMovies();
      dispatch({ type: FETCH_MOVIES_SUCCESS, payload: movies });
    } catch (error) {
      dispatch({ type: FETCH_MOVIES_FAILURE, payload: error.message });
    }
  };
};

// Action to fetch movie details
export const fetchMovieDetailsAction = (movieId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_MOVIE_DETAILS_REQUEST });
    try {
      const movieDetails = await fetchMovieDetails(movieId);
      dispatch({ type: FETCH_MOVIE_DETAILS_SUCCESS, payload: movieDetails });
    } catch (error) {
      dispatch({ type: FETCH_MOVIE_DETAILS_FAILURE, payload: error.message });
    }
  };
};

// Action to fetch genres
export const fetchGenresAction = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_GENRES_REQUEST });
    try {
      const genres = await fetchGenres();
      dispatch({ type: FETCH_GENRES_SUCCESS, payload: genres });
    } catch (error) {
      dispatch({ type: FETCH_GENRES_FAILURE, payload: error.message });
    }
  };
};
