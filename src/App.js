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
import LoginPage from './components/LoginPage';  // Import the LoginPage component
import { fetchMoviesBySearch } from './services/tmdbApi';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Home');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Track authentication state

  // Handle menu toggle
  const handleMenuClick = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  // Handle genre selection
  const handleGenreSelect = (genreId) => {
    setSelectedGenreId(genreId);
    setSearchResults([]);
    setSelectedCategory('Home');
    setSidebarOpen(false);
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedGenreId(null);
    setSearchResults([]);
    setSidebarOpen(false);
  };

  // Handle search input from AppBar
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

  // Handle login submission (dummy authentication)
  const handleLoginSubmit = (loginData) => {
    console.log('Login successful:', loginData);
    setIsAuthenticated(true);  // Set authenticated state to true after login
  };

  // Create a light theme instance
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
          {/* Conditionally render the LoginPage or the main app based on authentication */}
          {!isAuthenticated ? (
            <LoginPage onLoginSubmit={handleLoginSubmit} />  
          ) : (
            <>
              {/* App Bar Component */}
              <AppBarComponent onMenuClick={handleMenuClick} onSearchClick={handleSearchClick} />

              {/* Sidebar Component */}
              <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onSelectGenre={handleGenreSelect}
                onSelectCategory={handleCategorySelect}
              />

              <div style={{ marginTop: '64px' }}>
                <Routes>
                  {/* Default Home Route */}
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
                  {/* Movie Details Route */}
                  <Route path="/movie/:movieId" element={<MovieDetails />} />
                  {/* Actor Details Route */}
                  <Route path="/actors/:actorId" element={<ActorDetails />} />
                </Routes>
              </div>

              {/* Loader when fetching search results */}
              {isLoading && <div>Loading...</div>}
            </>
          )}
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
