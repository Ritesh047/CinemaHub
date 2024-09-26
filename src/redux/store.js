// src/redux/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // Correct named import
import movieReducer from './reducers/movieReducer';

// Combine all reducers
const rootReducer = combineReducers({
  movies: movieReducer,
  // Add other reducers here if needed
});

// Create Redux store with thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

// Export the configured store
export default store;
