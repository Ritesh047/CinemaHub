import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBarComponent from './components/AppBar';
import Sidebar from './components/Sidebar';
import MovieGrid from './components/MovieGrid';
import MovieDetails from './components/MovieDetails';
import ActorDetails from './components/ActorDetails';
import Favorites from './components/Favorites';
import Upcoming from './components/Upcoming';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage'; 
import { fetchMoviesBySearch } from './services/tmdbApi';
import './App.css'; // Import your CSS file for styles

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Home'); // Default to Home
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  const handleGenreSelect = (genreId) => {
    setSelectedGenreId(genreId);
    setSearchResults([]);
    setSelectedCategory('Home');
    setSidebarOpen(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedGenreId(null);
    setSearchResults([]);

    // If the selected category is Home, ensure the view resets
    if (category === 'Home') {
      setSelectedGenreId(null); // Reset genre if going to Home
    }

    setSidebarOpen(false);
  };

  const handleSearchClick = async (searchTerm) => {
    if (searchTerm.trim() === '') return;
    setIsLoading(true);
    try {
      const results = await fetchMoviesBySearch(searchTerm);
      setSearchResults(results);
      setSelectedGenreId(null);
      setSelectedCategory('');
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false);
      setSidebarOpen(false);
    }
  };

  const handleLoginSubmit = (loginData) => {
    console.log('Login successful:', loginData);
    setIsAuthenticated(true);
  };

  const theme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: '#fff',
        paper: '#f5f5f5',
      },
      text: {
        primary: '#000',
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#1976d2',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: '#000',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div>
          {!isAuthenticated ? (
            <LoginPage onLoginSubmit={handleLoginSubmit} />
          ) : (
            <>
              <AppBarComponent onMenuClick={handleMenuClick} onSearchClick={handleSearchClick} />
              <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onSelectGenre={handleGenreSelect}
                onSelectCategory={handleCategorySelect}
              />
              <div className="main-content"> {/* Add this class for scrollable content */}
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        {selectedCategory === 'Favorites' && <Favorites />}
                        {selectedCategory === 'Upcoming' && <Upcoming />}
                        {selectedCategory === 'Home' || selectedCategory === '' ? (
                          <MovieGrid
                            selectedGenre={selectedGenreId}
                            searchResults={searchResults}
                            isLoading={isLoading}
                          />
                        ) : null}
                      </>
                    }
                  />
                  <Route path="/movie/:movieId" element={<MovieDetails />} />
                  <Route path="/actors/:actorId" element={<ActorDetails />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                {isLoading && <div>Loading...</div>}
              </div>
            </>
          )}
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
