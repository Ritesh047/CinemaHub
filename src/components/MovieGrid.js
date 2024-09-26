import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';
import { fetchPopularMovies, fetchMoviesByGenre } from '../services/tmdbApi';
import './MovieGrid.css';

const MovieGrid = ({ selectedGenre, searchResults }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        let movieData;

        // Use searchResults if available
        if (searchResults && searchResults.length > 0) {
          movieData = searchResults; // Use the search results directly
        } else if (selectedGenre) {
          movieData = await fetchMoviesByGenre(selectedGenre, currentPage);
        } else {
          movieData = await fetchPopularMovies(currentPage);
        }

        setMovies(movieData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [selectedGenre, currentPage, searchResults]); // Include searchResults in dependencies

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        Error: {error}
      </Typography>
    );
  }

  // Function to handle long press
  const handleLongPress = (movieId) => {
    setTimeout(() => {
      navigate(`/movie/${movieId}`); // Navigate to movie details after long press
    }, 700); // 700 ms for long press duration
  };

  // Function to clear the long press action
  const handlePressRelease = () => {
    // This can be left empty if no action is needed on release
  };

  // Get the latest movie (first movie in the list)
  const latestMovie = movies[0] || {};

  return (
    <div className="movie-grid">
      {/* Featured Latest Movie Section */}
      <Box className="latest-movie">
        {latestMovie.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/original/${latestMovie.backdrop_path}`}
            alt={latestMovie.title}
            className="latest-movie-backdrop"
          />
        ) : null}
        <div className="latest-movie-info">
          <Typography variant="h2" className="latest-movie-title">
            {latestMovie.title}
          </Typography>
          <Typography variant="body1" className="latest-movie-description">
            {latestMovie.overview}
          </Typography>
        </div>
      </Box>

      {/* Movie Card Grid */}
      <Grid container spacing={2} className="movie-card-grid">
        {movies.slice(1).map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <div
              onMouseDown={() => handleLongPress(movie.id)}
              onMouseUp={handlePressRelease}
              onTouchStart={() => handleLongPress(movie.id)}
              onTouchEnd={handlePressRelease}
              style={{ cursor: 'pointer' }}
            >
              <MovieCard movie={movie} />
            </div>
          </Grid>
        ))}
      </Grid>

      {/* Next Button */}
      <Box mt={4} display="flex" justifyContent="center">
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
        >
          Next
        </Button>
      </Box>
    </div>
  );
};

export default MovieGrid;
