import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Typography, Card, CardMedia, CardContent, CircularProgress, Grid, Box, Button } from '@mui/material';
import './ActorDetails.css';

const ActorDetails = () => {
  const { actorId } = useParams();
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = 'ce993c3f47e79d3c8afba611b131000a'; // Your TMDB API key

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        // Fetch actor details
        const actorResponse = await axios.get(`https://api.themoviedb.org/3/person/${actorId}?api_key=${apiKey}&language=en-US`);
        setActor(actorResponse.data);

        // Fetch actor movie credits
        const creditsResponse = await axios.get(`https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${apiKey}`);
        setMovies(creditsResponse.data.cast); // Set the actor's movies
      } catch (error) {
        console.error("Error fetching actor details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActorDetails();
  }, [actorId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!actor) {
    return <Typography variant="h6">Actor not found</Typography>;
  }

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#141414', color: '#FFFFFF' }}>
      {/* Actor details */}
      <Box sx={{ display: 'flex', marginBottom: '40px' }}>
        <CardMedia
          component="img"
          alt={actor.name}
          image={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} // Actor's image
          sx={{ width: '300px', marginRight: '20px', borderRadius: '8px' }}
        />
        <Box>
          <Typography variant="h3">{actor.name}</Typography>
          <Typography variant="subtitle1" color="textSecondary">Born: {new Date(actor.birthday).toDateString()}</Typography>
          <Typography variant="body1" sx={{ marginTop: '20px' }}>
            {actor.biography}
          </Typography>
          <Button 
            variant="contained" 
            sx={{ marginTop: '20px', backgroundColor: '#E50914', color: '#FFFFFF', '&:hover': { backgroundColor: '#f40612' } }}
            href={`https://www.imdb.com/name/${actor.imdb_id}`} 
            target="_blank">
            IMDB
          </Button>
        </Box>
      </Box>

      {/* Actor's movies */}
      <Typography variant="h4" gutterBottom>Movies</Typography>
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={6} sm={4} md={3} lg={2}>
            <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
              <Card className="movie-card" sx={{ backgroundColor: '#E50914', color: '#FFFFFF' }}> {/* Changed to red background */}
                <CardMedia
                  component="img"
                  alt={movie.title}
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Movie poster image
                  height="300"
                />
                <CardContent>
                  <Typography variant="body1" align="center">{movie.title}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* Back button */}
      <Box sx={{ marginTop: '20px' }}>
        <Button variant="contained" sx={{ backgroundColor: '#E50914', color: '#FFFFFF', '&:hover': { backgroundColor: '#f40612' } }} onClick={() => window.history.back()}>
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default ActorDetails;
