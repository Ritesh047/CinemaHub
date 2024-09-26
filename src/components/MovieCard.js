import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActionArea, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  // Temporary rating for demo, replace with actual rating data if available
  const rating = Math.round(movie.vote_average / 2); // Assuming rating is out of 10, and converting to 5-star format

  return (
    <Card className="movie-card">
      <CardActionArea>
        <CardMedia
          component="img"
          alt={movie.title}
          className="movie-poster"
          image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/path/to/placeholder.jpg'}
        />
        <CardContent className="card-content">
          <Typography variant="h6" className="movie-title" noWrap>
            {movie.title}
          </Typography>
          <Box className="rating-stars">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon key={i} className={i < rating ? 'star-filled' : 'star-empty'} />
            ))}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
