import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';
import { fetchPopularMovies, fetchMoviesByGenre } from '../services/tmdbApi';
import './MovieGrid.css'; // Ensure you update this CSS for dark mode

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

        if (searchResults && searchResults.length > 0) {
          // If there are search results, use them directly
          movieData = searchResults;
        } else if (selectedGenre) {
          // Fetch movies by selected genre
          movieData = await fetchMoviesByGenre(selectedGenre, currentPage);
        } else {
          // Fetch popular movies
          movieData = await fetchPopularMovies(currentPage);
        }

        // Set the fetched movies
        setMovies(movieData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [selectedGenre, currentPage, searchResults]);

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

  const handleLongPress = (movieId) => {
    setTimeout(() => {
      navigate(`/movie/${movieId}`);
    }, 700); // 700 ms for long press
  };

  const handlePressRelease = () => {
    // Handle long press release
  };

  const latestMovie = movies[0] || {};

  return (
    <div className="movie-grid">
      {/* Featured Latest Movie Section */}
      <Box
        className="latest-movie"
        sx={{ backgroundColor: '#141414', color: '#fff', padding: 2 }} // Dark background
      >
        {latestMovie.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/original/${latestMovie.backdrop_path}`}
            alt={latestMovie.title}
            className="latest-movie-backdrop"
          />
        ) : null}
        <div className="latest-movie-info">
          <Typography variant="h2" className="latest-movie-title" sx={{ color: '#fff' }}>
            {latestMovie.title}
          </Typography>
          <Typography variant="body1" className="latest-movie-description" sx={{ color: '#d3d3d3' }}>
            {latestMovie.overview}
          </Typography>
        </div>
      </Box>

      {/* Movie Card Grid */}
      <Grid container spacing={2} className="movie-card-grid" sx={{ backgroundColor: '#141414', padding: 2 }}>
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
      <Box mt={4} display="flex" justifyContent="center" sx={{ backgroundColor: '#141414' }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)} // Increment page number
          sx={{ backgroundColor: '#E50914', color: '#fff' }} // Netflix red button
        >
          Next
        </Button>
      </Box>
    </div>
  );
};

export default MovieGrid;
