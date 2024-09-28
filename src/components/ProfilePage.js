import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Button,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import MovieIcon from '@mui/icons-material/Movie';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const avatars = [
  'https://example.com/avatar1.jpg',
  // Add more avatar URLs as needed
];

const ProfilePage = () => {
  const [userAvatar, setUserAvatar] = useState(avatars[0]);
  const [userName, setUserName] = useState('User Name'); // State for user name
  const [watchlist, setWatchlist] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newAvatar, setNewAvatar] = useState(userAvatar);
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false);
  const [openNameDialog, setOpenNameDialog] = useState(false); // New state for name dialog
  const [newName, setNewName] = useState(userName); // State for new user name
  const navigate = useNavigate();

  const handleEditClick = () => setOpenNameDialog(true); // Open name edit dialog
  const handleDialogClose = () => setOpenDialog(false);
  const handleNameDialogClose = () => setOpenNameDialog(false); // Close name dialog

  const handleSaveChanges = () => {
    setUserAvatar(newAvatar);
    setOpenDialog(false);
  };

  const handleSaveNameChanges = () => {
    setUserName(newName); // Update user name
    setOpenNameDialog(false); // Close the name edit dialog
  };

  const handleSettingsClick = () => setOpenSettingsDialog(true);
  const handleSettingsDialogClose = () => setOpenSettingsDialog(false);
  const handleDeleteAccount = () => {
    console.log('Account deleted');
    navigate('/');
  };

  const handleRemoveFromWatchlist = (movie) => {
    setWatchlist((prevWatchlist) => prevWatchlist.filter((item) => item !== movie));
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserAvatar(reader.result); // Set uploaded avatar
        setNewAvatar(reader.result); // Set new avatar for dialog
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box className="profile-background" sx={{ padding: '20px' }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" alignItems="center" sx={{ mb: 4 }}>
            <Avatar
              alt="User Avatar"
              src={userAvatar}
              sx={{ width: 120, height: 120, border: '4px solid #E50914', mb: 2 }}
            />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#E50914', textAlign: 'center' }}>
              {userName}
            </Typography>
            <Box display="flex" justifyContent="center" gap={2} sx={{ mt: 2 }}>
              <IconButton sx={{ color: '#E50914' }} onClick={handleEditClick}>
                <EditIcon />
              </IconButton>
              <IconButton sx={{ color: '#E50914' }} onClick={handleSettingsClick}>
                <SettingsIcon />
              </IconButton>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
              <MovieIcon sx={{ color: '#E50914', mr: 1 }} />
              Watchlist
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              {watchlist.length === 0 ? (
                <Typography variant="body1" sx={{ color: '#ffffff' }}>
                  Your watchlist is empty.
                </Typography>
              ) : (
                watchlist.map((movie, index) => (
                  <Box key={index} display="flex" justifyContent="space-between" alignItems="center" sx={{
                    backgroundColor: '#E50914',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                  }}>
                    <Typography variant="body1">{movie}</Typography>
                    <Button onClick={() => handleRemoveFromWatchlist(movie)} color="inherit">Remove</Button>
                  </Box>
                ))
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Dialog to edit profile picture */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Select a profile picture:
          </Typography>
          <Box display="flex" justifyContent="space-around">
            {avatars.map((avatar, index) => (
              <Avatar key={index} src={avatar} sx={{
                width: 60,
                height: 60,
                cursor: 'pointer',
                border: avatar === newAvatar ? '2px solid #E50914' : 'none',
              }} onClick={() => setNewAvatar(avatar)} />
            ))}
          </Box>
          {/* File input for custom avatar upload */}
          <Box mt={2}>
            <input type="file" accept="image/*" onChange={handleAvatarUpload} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">Cancel</Button>
          <Button onClick={handleSaveChanges} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog to edit user name */}
      <Dialog open={openNameDialog} onClose={handleNameDialogClose}>
        <DialogTitle>Edit Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="User Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNameDialogClose} color="primary">Cancel</Button>
          <Button onClick={handleSaveNameChanges} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Settings dialog */}
      <Dialog open={openSettingsDialog} onClose={handleSettingsDialogClose}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Manage your account settings here.</Typography>
          <Button onClick={handleDeleteAccount} color="error">Delete Account</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSettingsDialogClose} color="primary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfilePage;
