import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const AppBarComponent = ({ onMenuClick, onSearchClick }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [openLogin, setOpenLogin] = React.useState(false);
  const [loginData, setLoginData] = React.useState({ email: '', password: '' });

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

  const handleLoginOpen = () => {
    setOpenLogin(true);
  };

  const handleLoginClose = () => {
    setOpenLogin(false);
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = () => {
    console.log("Login Data:", loginData);
    setOpenLogin(false);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#1B263B' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            CinemaHub
          </Typography>

          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            sx={{ backgroundColor: '#fff', borderRadius: 1, mr: 1 }}
          />
          <IconButton color="inherit" onClick={handleSearchSubmit}>
            <SearchIcon />
          </IconButton>

          <Button color="inherit" onClick={handleLoginOpen}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Login Dialog */}
      <Dialog open={openLogin} onClose={handleLoginClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your login credentials.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={loginData.email}
            onChange={handleLoginChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={loginData.password}
            onChange={handleLoginChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLoginClose}>Cancel</Button>
          <Button onClick={handleLoginSubmit}>Login</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AppBarComponent;
