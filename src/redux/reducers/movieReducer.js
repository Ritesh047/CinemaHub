// movieReducer.js
import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  FETCH_MOVIE_DETAILS_REQUEST,
  FETCH_MOVIE_DETAILS_SUCCESS,
  FETCH_MOVIE_DETAILS_FAILURE,
  FETCH_GENRES_REQUEST,
  FETCH_GENRES_SUCCESS,
  FETCH_GENRES_FAILURE,
} from '../actions/movieActions';

const initialState = {
  movies: [],
  movieDetails: {},
  genres: [],
  loading: false,
  error: null,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_REQUEST:
    case FETCH_MOVIE_DETAILS_REQUEST:
    case FETCH_GENRES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };
    case FETCH_MOVIE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        movieDetails: action.payload,
      };
    case FETCH_GENRES_SUCCESS:
      return {
        ...state,
        loading: false,
        genres: action.payload,
      };
    case FETCH_MOVIES_FAILURE:
    case FETCH_MOVIE_DETAILS_FAILURE:
    case FETCH_GENRES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default movieReducer;
