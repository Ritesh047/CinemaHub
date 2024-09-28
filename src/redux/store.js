// redux/store.js

import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // Correctly import thunk as a named export
import movieReducer from './reducers/movieReducer'; // Ensure this path and name are correct

const rootReducer = combineReducers({
  movies: movieReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
