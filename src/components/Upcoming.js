// src/components/Upcoming.js
import React, { useEffect, useState } from 'react';
import { fetchUpcomingMovies } from '../services/tmdbApi'; // Adjust the path according to your structure
import MovieCard from './MovieCard'; // Import your MovieCard component
import { Grid, Typography, CircularProgress, Box } from '@mui/material';

const Upcoming = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getUpcomingMovies = async () => {
      try {
        const movies = await fetchUpcomingMovies();
        setUpcomingMovies(movies);
      } catch (err) {
        setError('Failed to fetch upcoming movies');
      } finally {
        setLoading(false);
      }
    };

    getUpcomingMovies();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ backgroundColor: '#141414', padding: '20px', minHeight: '100vh' }}> {/* Set dark background color */}
      <Typography variant="h4" gutterBottom sx={{ color: '#FFFFFF' }}> {/* Set text color to white */}
        Upcoming Movies
      </Typography>
      <Grid container spacing={2}>
        {upcomingMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Upcoming;
