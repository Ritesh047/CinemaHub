import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Grid,
  Button,
  Box,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ScienceIcon from '@mui/icons-material/Science';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import YouTubeIcon from '@mui/icons-material/YouTube'; // Import YouTube icon
import './MovieDetails.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState(null); // State for the trailer URL
  const navigate = useNavigate();
  const apiKey = 'ce993c3f47e79d3c8afba611b131000a'; // Your TMDB API key

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
        );
        setMovie(movieResponse.data);

        const creditsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
        );
        setMovie((prev) => ({ ...prev, credits: creditsResponse.data }));
      } catch (error) {
        console.error('Error fetching movie details:', error);
        alert('Could not fetch movie details. Please try again later.'); // Improved error handling
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleAddFavorite = () => {
    setIsFavorite((prev) => !prev);
    alert(isFavorite ? 'Removed from Favorites' : 'Added to Favorites');
  };

  const handleAddWatchlist = () => {
    setInWatchlist((prev) => !prev);
    alert(inWatchlist ? 'Removed from Watchlist' : 'Added to Watchlist');
  };

  const handleWatchTrailer = async () => {
    try {
      const trailerResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`
      );
      const trailer = trailerResponse.data.results.find(
        (video) => video.type === 'Trailer' && video.site === 'YouTube'
      );
      if (trailer) {
        setTrailerUrl(trailer.key); // Set the trailer URL
      } else {
        alert('Trailer not found for this movie.');
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
      alert('Could not fetch trailer. Please try again later.');
    }
  };

  const handleVisitWebsite = () => {
    if (movie.homepage) {
      window.open(movie.homepage, '_blank');
    } else {
      alert('Website not available for this movie');
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!movie) {
    return <Typography variant="h6">Movie not found</Typography>;
  }

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        padding: '10px',
        backgroundColor: '#121212', // Dark background for the card
        color: '#ffffff', // Light text color for readability
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // Softer shadow
      }}
    >
      {/* Movie Poster */}
      <Box
        sx={{
          width: { xs: '100%', md: '350px' },
          marginBottom: { xs: '10px', md: '1' },
          overflow: 'hidden', // Prevent overflow for a cleaner look
          borderRadius: '8px', // Rounded corners for the poster
        }}
      >
        <CardMedia
          component="img"
          alt={movie.title}
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          sx={{
            borderRadius: '8px',
            transition: 'transform 0.3s ease', // Smooth zoom effect
            '&:hover': {
              transform: 'scale(1.05)', // Scale effect on hover
            },
          }}
        />
      </Box>

      {/* Movie Details */}
      <Box sx={{ flex: 1, marginLeft: { md: '20px' } }}>
        <Typography variant="h3" sx={{ fontSize: { xs: '2.5rem', md: '2rem' } }}>
          {movie.title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {movie.runtime} min | {movie.original_language.toUpperCase()}
        </Typography>
        <Typography variant="h6" sx={{ mt: 1, mb: 2 }}>
          <StarIcon style={{ verticalAlign: 'middle', color: 'gold' }} />{' '}
          {movie.vote_average} / 10
        </Typography>
        <Typography variant="body1">{movie.overview}</Typography>

        {/* Genre and icons */}
        <Box
          sx={{
            mt: 3,
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          {movie.genres.map((genre, idx) => (
            <Typography
              key={idx}
              variant="h6"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                color: '#ffffff', // Light text color for genres
              }}
            >
              {genre.name === 'Action' && <LocalActivityIcon />}
              {genre.name === 'Comedy' && <EmojiEmotionsIcon />}
              {genre.name === 'Science Fiction' && <ScienceIcon />}
              {genre.name}
            </Typography>
          ))}
        </Box>

        {/* Cast List */}
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid container spacing={5}>
          {movie.credits?.cast.slice(0, 6).map((actor) => (
            <Grid item key={actor.id} xs={6} sm={4} md={3} lg={2}>
              <Link to={`/actors/${actor.id}`} style={{ textDecoration: 'none' }}>
                <Card
                  sx={{
                    backgroundColor: '#E50914', // Netflix red background for actor cards
                    color: '#ffffff', // Light text color
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={actor.name}
                    image={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                    height="150"
                    sx={{
                      transition: 'transform 0.3s ease', // Smooth zoom effect
                      '&:hover': {
                        transform: 'scale(1.1)', // Zoom effect on hover
                      },
                    }}
                  />
                  <CardContent>
                    <Typography variant="body1" align="center">
                      {actor.name}
                    </Typography>
                    <Typography variant="body2" align="center" color="textSecondary">
                      {actor.character}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>

        {/* Buttons for Website, Trailer, Favorite, Watchlist, and Back */}
        <Box
  sx={{
    mt: 3,
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    gap: '10px',
  }}
>
  <Button
    variant="contained"
    sx={{ backgroundColor: '#E50914', color: '#ffffff' }} // Netflix red for Watch Trailer button
    onClick={handleWatchTrailer}
    startIcon={<YouTubeIcon />}
  >
    Watch Trailer
  </Button>
  <Button
    variant="contained"
    sx={{ backgroundColor: '#E50914', color: '#ffffff' }} // Netflix red for Visit Website button
    onClick={handleVisitWebsite}
  >
    Visit Website
  </Button>
  <Button
    variant="contained"
    sx={{ backgroundColor: isFavorite ? '#E50914' : '#D3D3D3', color: '#ffffff' }} // Toggle between colors
    onClick={handleAddFavorite}
  >
    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
  </Button>
  <Button
    variant="contained"
    sx={{ backgroundColor: inWatchlist ? '#E50914' : '#D3D3D3', color: '#ffffff' }} // Toggle between colors
    onClick={handleAddWatchlist}
  >
    {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
  </Button>
  <Button
    variant="contained"
    sx={{ backgroundColor: '#E50914', color: '#ffffff' }} // Set the background color to red for Back button
    onClick={handleBack}
    startIcon={<ArrowBackIcon />}
  >
    Back
  </Button>
</Box>


        {/* Trailer Section */}
        {trailerUrl && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5">Trailer</Typography>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${trailerUrl}`}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default MovieDetails;
