import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MovieIcon from '@mui/icons-material/Movie';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import ScienceIcon from '@mui/icons-material/Science';
import SportsIcon from '@mui/icons-material/SportsSoccer';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NatureIcon from '@mui/icons-material/Terrain';
import SecurityIcon from '@mui/icons-material/Security';
import PersonIcon from '@mui/icons-material/Person';

// Import the CSS file
import './Sidebar.css';

// Movie categories
const movieCategories = [
  { name: 'Home', icon: <MovieIcon /> },
  { name: 'Favorites', icon: <FavoriteIcon /> },
  { name: 'Upcoming', icon: <SentimentVerySatisfiedIcon /> },
];

// Updated movie genres with IDs
const movieGenres = [
  { name: 'Action', id: 28, icon: <StarIcon /> },
  { name: 'Comedy', id: 35, icon: <TheaterComedyIcon /> },
  { name: 'Drama', id: 18, icon: <TheaterComedyIcon /> },
  { name: 'Romance', id: 10749, icon: <FavoriteIcon /> },
  { name: 'Science Fiction', id: 878, icon: <ScienceIcon /> },
  { name: 'Horror', id: 27, icon: <MovieIcon /> },
  { name: 'Thriller', id: 53, icon: <MovieIcon /> },
  { name: 'Fantasy', id: 14, icon: <MovieIcon /> },
  { name: 'Adventure', id: 12, icon: <NatureIcon /> },
  { name: 'Mystery', id: 9648, icon: <VisibilityIcon /> },
  { name: 'Biography', id: 36, icon: <PersonIcon /> },
  { name: 'War', id: 10752, icon: <SecurityIcon /> },
  { name: 'Sports', id: 16, icon: <SportsIcon /> },
];

const Sidebar = ({ open, onClose, onSelectCategory, onSelectGenre }) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: '#141414', // Dark background
          color: '#f8f9fa', // Light text color
          width: 240, // Fixed width for the sidebar
        },
      }}
    >
      <List>
        <Divider sx={{ backgroundColor: '#f8f9fa' }} />
        {/* Categories Section */}
        {movieCategories.map((category) => (
          <ListItem
            button
            key={category.name}
            onClick={() => onSelectCategory(category.name)}
            sx={{
              '&:hover': {
                backgroundColor: '#e50914', // Netflix red on hover
              },
              color: '#f8f9fa',
              padding: '10px 20px', // Increased padding
            }}
          >
            <ListItemIcon sx={{ color: '#f8f9fa' }}>{category.icon}</ListItemIcon>
            <ListItemText primary={category.name} />
          </ListItem>
        ))}
        <Divider sx={{ backgroundColor: '#f8f9fa' }} />
        {/* Genres Section */}
        {movieGenres.map((genre) => (
          <ListItem
            button
            key={genre.id} // Use genre ID as key for better performance
            onClick={() => onSelectGenre(genre.id)} // Pass genre ID
            sx={{
              '&:hover': {
                backgroundColor: '#e50914', // Netflix red on hover
              },
              color: '#f8f9fa',
              padding: '10px 20px', // Increased padding
            }}
          >
            <ListItemIcon sx={{ color: '#f8f9fa' }}>{genre.icon}</ListItemIcon>
            <ListItemText primary={genre.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
