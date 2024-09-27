import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { TextField, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const AppBarComponent = ({ onMenuClick, onSearchClick, onLogout }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      onSearchClick(searchTerm);
      setSearchTerm('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    // Redirect to profile page when clicked
    handleProfileMenuClose();
    navigate('/profile');
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#141414' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <Typography 
          variant="h6" 
          sx={{ 
            flexGrow: 1, 
            fontFamily: '"Bebas Neue", sans-serif', 
            fontWeight: 'bold', 
            letterSpacing: 3,
            fontSize: '2rem', 
            color: '#E50914', 
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' 
          }}
        >
          MovieFlix
        </Typography>

        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          sx={{
            backgroundColor: '#333333',
            borderRadius: 5,
            mr: 1,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: 'transparent',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#E50914',
              },
            },
            '& .MuiInputBase-input': {
              color: '#ffffff',
              padding: '10px 12px',
            },
          }}
        />
        <IconButton color="inherit" onClick={handleSearchSubmit}>
          <SearchIcon />
        </IconButton>

        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls="profile-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={handleProfileMenuOpen}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
        >
          <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
          
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
