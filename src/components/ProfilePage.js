import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import MovieIcon from '@mui/icons-material/Movie'; // Import icon for watchlist
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css'; // Import the CSS file

const ProfilePage = () => {
  const [userName, setUserName] = useState('Ritesh Kumar Behera');
  const [userAvatar, setUserAvatar] = useState('https://example.com/avatar.jpg'); // Replace with actual image
  const [favoriteGenres, setFavoriteGenres] = useState(['Action', 'Comedy', 'Drama']);
  const [watchlist, setWatchlist] = useState([]); // New state for watchlist
  const [openDialog, setOpenDialog] = useState(false);
  const [newAvatar, setNewAvatar] = useState(userAvatar);
  const [newUserName, setNewUserName] = useState(userName);
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false); // New state for settings dialog
  const navigate = useNavigate();

  const handleEditClick = () => {
    setOpenDialog(true);
    setNewUserName(userName);
    setNewAvatar(userAvatar);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSaveChanges = () => {
    setUserName(newUserName);
    setUserAvatar(newAvatar);
    setOpenDialog(false);
  };

  const handleGenreClick = (genre) => {
    navigate(`/genre/${genre}`);
  };

  // New functions for settings dialog
  const handleSettingsClick = () => {
    setOpenSettingsDialog(true);
    setNewUserName(userName);
    setNewAvatar(userAvatar);
  };

  const handleSettingsDialogClose = () => {
    setOpenSettingsDialog(false);
  };

  const handleDeleteAccount = () => {
    // Logic for account deletion (e.g., API call)
    console.log('Account deleted'); // Replace with actual deletion logic
    // Redirect or update state after deletion
    navigate('/'); // Redirect to home or login page
  };

  const handleSaveSettings = () => {
    setUserName(newUserName);
    setUserAvatar(newAvatar);
    setOpenSettingsDialog(false);
  };

  // Watchlist functions
  const handleAddToWatchlist = (movie) => {
    if (!watchlist.includes(movie)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  const handleRemoveFromWatchlist = (movie) => {
    setWatchlist(watchlist.filter((item) => item !== movie));
  };

  return (
    <Box className="profile-background"> {/* Add class for background */}
      {/* Profile Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 6 }}>
        <Box display="flex" alignItems="center">
          <Avatar
            alt={userName}
            src={userAvatar}
            sx={{ width: 120, height: 120, border: '4px solid #E50914' }}
          />
          <Box sx={{ ml: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#E50914' }}>
              {userName}
            </Typography>
            <IconButton sx={{ color: '#FFFFFF' }} aria-label="edit profile" onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
            <IconButton sx={{ color: '#FFFFFF' }} aria-label="settings" onClick={handleSettingsClick}>
              <SettingsIcon />
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
          {favoriteGenres.map((genre, index) => (
            <Typography
              key={index}
              variant="body1"
              sx={{
                backgroundColor: '#E50914',
                padding: '8px 16px',
                borderRadius: '20px',
                color: '#FFFFFF',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onClick={() => handleGenreClick(genre)}
            >
              {genre}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Watchlist Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          <MovieIcon sx={{ color: '#E50914', mr: 1 }} />
          Watchlist
        </Typography>
        <Box display="flex" flexDirection="column" gap={1}>
          {watchlist.length === 0 ? (
            <Typography variant="body1" sx={{ color: '#FFFFFF' }}>
              Your watchlist is empty.
            </Typography>
          ) : (
            watchlist.map((movie, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  backgroundColor: '#E50914',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                }}
              >
                <Typography variant="body1">{movie}</Typography>
                <Button onClick={() => handleRemoveFromWatchlist(movie)} color="inherit">
                  Remove
                </Button>
              </Box>
            ))
          )}
        </Box>
      </Box>

      {/* Edit Profile Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Avatar URL"
            type="text"
            fullWidth
            variant="outlined"
            value={newAvatar}
            onChange={(e) => setNewAvatar(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={openSettingsDialog} onClose={handleSettingsDialogClose}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Avatar URL"
            type="text"
            fullWidth
            variant="outlined"
            value={newAvatar}
            onChange={(e) => setNewAvatar(e.target.value)}
          />
          <Button onClick={handleDeleteAccount} color="error">
            Delete Account
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSettingsDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveSettings} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfilePage;
