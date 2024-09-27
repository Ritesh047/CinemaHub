import React from 'react';
import { Avatar, Box, Typography, Grid, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EditIcon from '@mui/icons-material/Edit';

const ProfileSectionNetflix = () => {
  const user = {
    name: "Ritesh Kumar Behera",
    avatar: "https://example.com/avatar.jpg", // Replace with the actual image
    favoriteGenres: ["Action", "Comedy", "Drama"],
    watchlist: [
      { id: 1, title: "Inception", poster: "https://example.com/inception.jpg" },
      { id: 2, title: "The Dark Knight", poster: "https://example.com/dark_knight.jpg" },
    ],
    recentActivity: [
      { id: 3, title: "Interstellar", poster: "https://example.com/interstellar.jpg" },
      { id: 4, title: "Dune", poster: "https://example.com/dune.jpg" },
    ],
  };

  return (
    <Box sx={{ padding: '40px', backgroundColor: '#141414', color: '#FFFFFF', minHeight: '100vh' }}>
      {/* Profile Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 6 }}>
        <Box display="flex" alignItems="center">
          <Avatar
            alt={user.name}
            src={user.avatar}
            sx={{ width: 120, height: 120, border: '4px solid #E50914' }}
          />
          <Box sx={{ ml: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#E50914' }}>
              {user.name}
            </Typography>
            <IconButton sx={{ color: '#FFFFFF' }} aria-label="edit profile">
              <EditIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Favorite Genres */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          <FavoriteIcon sx={{ color: '#E50914', mr: 1 }} />
          Favorite Genres
        </Typography>
        <Box display="flex" gap={2}>
          {user.favoriteGenres.map((genre, index) => (
            <Typography
              key={index}
              variant="body1"
              sx={{
                backgroundColor: '#E50914',
                padding: '8px 16px',
                borderRadius: '20px',
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}
            >
              {genre}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Watchlist Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          My Watchlist
        </Typography>
        <Box display="flex" overflow="scroll">
          {user.watchlist.map((movie) => (
            <Card
              key={movie.id}
              sx={{
                minWidth: 200,
                marginRight: 2,
                backgroundColor: '#141414',
                position: 'relative',
                '&:hover .play-button': {
                  display: 'flex',
                },
              }}
            >
              <CardMedia
                component="img"
                image={movie.poster}
                alt={movie.title}
                sx={{ height: 300 }}
              />
              <Box
                className="play-button"
                sx={{
                  display: 'none',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconButton sx={{ color: '#FFFFFF' }} aria-label="play movie">
                  <PlayArrowIcon sx={{ fontSize: 60 }} />
                </IconButton>
              </Box>
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  {movie.title}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Recent Activity */}
      <Box>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          Recently Watched
        </Typography>
        <Box display="flex" overflow="scroll">
          {user.recentActivity.map((movie) => (
            <Card
              key={movie.id}
              sx={{
                minWidth: 200,
                marginRight: 2,
                backgroundColor: '#141414',
                position: 'relative',
                '&:hover .play-button': {
                  display: 'flex',
                },
              }}
            >
              <CardMedia
                component="img"
                image={movie.poster}
                alt={movie.title}
                sx={{ height: 300 }}
              />
              <Box
                className="play-button"
                sx={{
                  display: 'none',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconButton sx={{ color: '#FFFFFF' }} aria-label="play movie">
                  <PlayArrowIcon sx={{ fontSize: 60 }} />
                </IconButton>
              </Box>
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  {movie.title}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileSectionNetflix;
