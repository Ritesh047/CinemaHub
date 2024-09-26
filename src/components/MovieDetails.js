import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Card, CardMedia, CardContent, CircularProgress, Grid, Button, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star'; // For rating
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'; // Comedy icon
import ScienceIcon from '@mui/icons-material/Science'; // Sci-Fi icon
import LocalActivityIcon from '@mui/icons-material/LocalActivity'; // Action icon
import FavoriteIcon from '@mui/icons-material/Favorite'; // Favorite icon
import WatchLaterIcon from '@mui/icons-material/WatchLater'; // Watchlist icon
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Back icon

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false); // For managing favorites
  const [inWatchlist, setInWatchlist] = useState(false); // For managing watchlist
  const navigate = useNavigate();
  const apiKey = 'ce993c3f47e79d3c8afba611b131000a'; // Your TMDB API key

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`);
        setMovie(movieResponse.data);
        
        const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`);
        setMovie((prev) => ({ ...prev, credits: creditsResponse.data }));
      } catch (error) {
        console.error("Error fetching movie details:", error);
        alert('Could not fetch movie details. Please try again later.'); // Improved error handling
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleAddFavorite = () => {
    setIsFavorite(prev => !prev);
    alert(isFavorite ? 'Removed from Favorites' : 'Added to Favorites');
  };

  const handleAddWatchlist = () => {
    setInWatchlist(prev => !prev);
    alert(inWatchlist ? 'Removed from Watchlist' : 'Added to Watchlist');
  };

  const handleWatchTrailer = () => {
    window.open(`https://www.youtube.com/results?search_query=${movie.title} trailer`, '_blank');
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
    <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, padding: '10px' }}>
      {/* Movie Poster */}
      <Box sx={{ width: { xs: '100%', md: '350px' }, marginBottom: { xs: '10px', md: '1' } }}>
        <CardMedia
          component="img"
          alt={movie.title}
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Poster image
          sx={{ borderRadius: '20px' }} // Optional styling for poster image
        />
      </Box>

      {/* Movie Details */}
      <Box sx={{ flex: 1, marginLeft: { md: '20px' } }}> {/* Added margin-left for space */}
        <Typography variant="h3" sx={{ fontSize: { xs: '2.5rem', md: '2rem' } }}>{movie.title}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {movie.runtime} min | {movie.original_language.toUpperCase()}
        </Typography>
        <Typography variant="h6" sx={{ mt: 1, mb: 2 }}>
          <StarIcon style={{ verticalAlign: 'middle', color: 'gold' }} /> {movie.vote_average} / 10
        </Typography>
        <Typography variant="body1">{movie.overview}</Typography>

        {/* Genre and icons */}
        <Box sx={{ mt: 3, mb: 3, display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {movie.genres.map((genre, idx) => (
            <Typography key={idx} variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {genre.name === 'Action' && <LocalActivityIcon />}
              {genre.name === 'Comedy' && <EmojiEmotionsIcon />}
              {genre.name === 'Science Fiction' && <ScienceIcon />}
              {genre.name}
            </Typography>
          ))}
        </Box>

        {/* Cast List */}
        <Typography variant="h5" gutterBottom>Top Cast</Typography>
        <Grid container spacing={5}>
          {movie.credits?.cast.slice(0, 6).map((actor) => (
            <Grid item key={actor.id} xs={6} sm={4} md={3} lg={2}>
              <Link to={`/actors/${actor.id}`} style={{ textDecoration: 'none' }}>
                <Card>
                  <CardMedia
                    component="img"
                    alt={actor.name}
                    image={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} // Actor profile image
                    height="150"
                  />
                  <CardContent>
                    <Typography variant="body1" align="center">{actor.name}</Typography>
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
        <Box sx={{ mt: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: '10px' }}>
          <Button variant="contained" color="primary" onClick={handleVisitWebsite}>
            Visit Website
          </Button>
          <Button variant="contained" color="secondary" onClick={handleWatchTrailer}>
            Watch Trailer
          </Button>
          <Button
            variant={isFavorite ? 'contained' : 'outlined'}
            color={isFavorite ? 'error' : 'default'}
            onClick={handleAddFavorite}
            startIcon={<FavoriteIcon />}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
          <Button
            variant={inWatchlist ? 'contained' : 'outlined'}
            color={inWatchlist ? 'warning' : 'default'}
            onClick={handleAddWatchlist}
            startIcon={<WatchLaterIcon />}
          >
            {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </Button>
          <Button variant="text" onClick={handleBack} startIcon={<ArrowBackIcon />}>
            Back
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default MovieDetails;
