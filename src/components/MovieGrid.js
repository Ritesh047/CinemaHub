import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress, Typography, Box, Button } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom'; // Use search params for pagination
import MovieCard from './MovieCard';
import { Rating } from '@mui/material'; 
import { fetchPopularMovies, fetchMoviesByGenre } from '../services/tmdbApi'; // Ensure pagination in API functions
import './MovieGrid.css'; // Ensure you update this CSS for dark mode

const MovieGrid = ({ selectedGenre, searchResults }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams(); // Using URL search params
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const navigate = useNavigate();

  // Get the current page from the URL or default to 1
  const currentPage = Number(searchParams.get('page')) || 1;

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
          // Fetch movies by selected genre with pagination
          movieData = await fetchMoviesByGenre(selectedGenre, currentPage);
        } else {
          // Fetch popular movies with pagination
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

    loadMovies(); // Fetch movies based on page change
  }, [selectedGenre, currentPage, searchResults]); // Re-fetch when the page or genre changes

  // Handle scroll event
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsScrollingDown(true); // Scrolling down
      } else {
        setIsScrollingDown(false); // Scrolling up
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle pagination (Next Page button)
  const handleNextPage = () => {
    setSearchParams({ page: currentPage + 1 }); // Update the URL with the next page number
    window.scrollTo(0, 0); // Scroll to the top
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setSearchParams({ page: currentPage - 1 }); // Update URL with the previous page number
      window.scrollTo(0, 0); // Scroll to the top
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`); // Navigate to movie details
  };

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

  const latestMovie = movies[0] || {};

  return (
    <div className={`movie-grid ${isScrollingDown ? 'hide' : 'show'}`}>
      {/* Featured Latest Movie Section */}
      <Box
        className="latest-movie"
        sx={{ backgroundColor: '#141414', color: '#fff', padding: 2 }}
        onClick={() => handleMovieClick(latestMovie.id)}
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
          {/* Displaying the star rating */}
          <Rating
            name="read-only"
            value={latestMovie.vote_average / 2} // Convert rating to a 5-star scale
            precision={0.1}
            readOnly
            sx={{ color: '#ffdd57', mt: 1 }}
          />
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
              onClick={() => handleMovieClick(movie.id)}
              style={{ cursor: 'pointer' }}
            >
              <MovieCard movie={movie} />
            </div>
          </Grid>
        ))}
      </Grid>

      {/* Pagination Buttons */}
      <Box mt={4} display="flex" justifyContent="center" gap={2} sx={{ backgroundColor: '#141414' }}>
        {/* Show Previous Button only if currentPage is greater than 1 */}
        {currentPage > 1 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handlePreviousPage}
            sx={{ backgroundColor: '#E50914', color: '#fff' }} // Netflix red button
          >
            Previous
          </Button>
        )}

        {/* Always show Next Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextPage}
          sx={{ backgroundColor: '#E50914', color: '#fff' }} // Netflix red button
        >
          Next
        </Button>
      </Box>
    </div>
  );
};

export default MovieGrid;
