import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActionArea, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  // Temporary rating for demo, replace with actual rating data if available
  const rating = Math.round(movie.vote_average / 2); // Assuming rating is out of 10, and converting to 5-star format

  return (
    <Card
      sx={{
        backgroundColor: '#1f1f1f', // Dark background for the card
        color: '#f8f9fa', // Light text for contrast
        borderRadius: '15px', // Rounded corners for a modern look
        overflow: 'hidden', // Prevent content overflow
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)', // Subtle shadow
        transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth hover transitions
        '&:hover': {
          transform: 'scale(1.05)', // Slight zoom effect on hover
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)', // Stronger shadow on hover
        },
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          alt={movie.title}
          className="movie-poster"
          image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/path/to/placeholder.jpg'}
          sx={{
            height: '400px', // Tall image for a cinematic feel
            objectFit: 'cover', // Cover the entire image area
            borderRadius: '10px', // Rounded corners for the image
            transition: 'transform 0.3s ease', // Subtle zoom on hover
            '&:hover': {
              transform: 'scale(1.08)', // More pronounced zoom on hover
            },
          }}
        />
        <CardContent
          sx={{
            padding: '16px',
            textAlign: 'center', // Center-align text for a clean look
          }}
        >
          <Typography variant="h6" className="movie-title" noWrap sx={{ marginBottom: '8px', fontWeight: 'bold' }}>
            {movie.title}
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center" mb={1}>
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon
                key={i}
                sx={{
                  color: i < rating ? '#ffcc00' : '#cccccc', // Yellow for filled stars, grey for empty stars
                  fontSize: '20px',
                }}
              />
            ))}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
