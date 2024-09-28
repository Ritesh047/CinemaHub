// moviesReducer.js
import { 
  FETCH_MOVIES_REQUEST, 
  FETCH_MOVIES_SUCCESS, 
  FETCH_MOVIES_FAILURE 
} from '../actions/movieActions';

const initialState = {
  movies: [],
  loading: false,
  error: null,
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_REQUEST:
      return { ...state, loading: true };
    case FETCH_MOVIES_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        movies: [...state.movies, ...action.payload], // Concatenate new movies
      };
    case FETCH_MOVIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default moviesReducer;
