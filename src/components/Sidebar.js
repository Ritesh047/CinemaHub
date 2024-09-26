import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MovieIcon from '@mui/icons-material/Movie';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import StarIcon from '@mui/icons-material/Star'; // Corrected the icon name for Action
import FavoriteIcon from '@mui/icons-material/Favorite';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import ScienceIcon from '@mui/icons-material/Science';
import SportsIcon from '@mui/icons-material/SportsSoccer'; // Corrected icon for sports
import VisibilityIcon from '@mui/icons-material/Visibility';
import NatureIcon from '@mui/icons-material/Terrain'; // Replaced Nature icon for Adventure
import SecurityIcon from '@mui/icons-material/Security';
import PersonIcon from '@mui/icons-material/Person';

const categories = [
  { name: 'Home', icon: <MovieIcon /> },
  { name: 'Favorites', icon: <FavoriteIcon /> },
  { name: 'Upcoming', icon: <SentimentVerySatisfiedIcon /> },
];

// Updated genres with IDs
const genres = [
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
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        <Divider />
        {/* Categories Section */}
        {categories.map((category) => (
          <ListItem 
            button 
            key={category.name} 
            onClick={() => onSelectCategory(category.name)}
          >
            <ListItemIcon>{category.icon}</ListItemIcon>
            <ListItemText primary={category.name} />
          </ListItem>
        ))}
        <Divider />
        {/* Genres Section */}
        {genres.map((genre) => (
          <ListItem 
            button 
            key={genre.name} 
            onClick={() => onSelectGenre(genre.id)} // Pass genre ID
          >
            <ListItemIcon>{genre.icon}</ListItemIcon>
            <ListItemText primary={genre.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
