import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Correct import
import AppBarComponent from './components/AppBar';
import Sidebar from './components/Sidebar';
import MovieGrid from './components/MovieGrid';
import MovieDetails from './components/MovieDetails';
import ActorDetails from './components/ActorDetails';
import Favorites from './components/Favorites';
import Upcoming from './components/Upcoming';
import { fetchMoviesBySearch } from './services/tmdbApi';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Home');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle menu toggle
  const handleMenuClick = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  // Handle genre selection from the sidebar
  const handleGenreSelect = (genreId) => {
    setSelectedGenreId(genreId);
    setSearchResults([]);
    setSelectedCategory('Home');
    setSidebarOpen(false);
  };

  // Handle category selection from the sidebar
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedGenreId(null);
    setSearchResults([]);
    setSidebarOpen(false);
  };

  // Handle search input from the AppBar
  const handleSearchClick = async (searchTerm) => {
    if (searchTerm.trim() === "") return;
    setIsLoading(true);
    try {
      const results = await fetchMoviesBySearch(searchTerm);
      setSearchResults(results);
      setSelectedGenreId(null);
      setSelectedCategory('');
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
      setSidebarOpen(false);
    }
  };

  // Create a light theme instance
  const theme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: '#fff',     // Background color for light mode
        paper: '#f5f5f5',    // Paper or card background color
      },
      text: {
        primary: '#000',    // Text color for light mode
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#1976d2', // Light AppBar color
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: '#000',  // Button text color in light mode
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensure global styles (background, text color) are applied */}
      <Router>
        <div>
          {/* App Bar Component */}
          <AppBarComponent
            onMenuClick={handleMenuClick}
            onSearchClick={handleSearchClick}
          />

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
                        isLoading={isLoading} // Pass loading state
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
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
