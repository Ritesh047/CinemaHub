import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import './LoginPage.css';

const LoginPage = ({ onLoginSubmit }) => {
  const navigate = useNavigate();
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showSetupScreen, setShowSetupScreen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [password, setPassword] = useState(''); // State for password input

  const handleSignInClick = () => {
    setShowSignInForm(true);
  };

  const handleGetStartedClick = (e) => {
    e.preventDefault();
    setShowSetupScreen(true);
  };

  const handlePasswordCreate = (e) => {
    e.preventDefault();
    setSuccessMessage('Password created successfully!');
    setPassword(''); // Clear the password input
    setTimeout(() => {
      navigate('/home');
    }, 2000);
  };

  const handleLoginClick = () => {
    if (successMessage) {
      setSuccessMessage('');
    }
    setShowSignInForm(true);
    setShowSetupScreen(false);
  };

  return (
    <div className="loginPage">
      <div className="loginPage__background">
        <div className="loginPage__header">
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontFamily: '"Bebas Neue", sans-serif',
              fontWeight: 'bold',
              letterSpacing: 3,
              fontSize: '2rem',
              color: '#E50914',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
            }}
          >
            MovieFlix
          </Typography>
          <button
            className="loginPage__signInButton"
            onClick={handleSignInClick}
            style={{ display: !showSignInForm && !showSetupScreen ? 'block' : 'none' }}
          >
            Sign In
          </button>
        </div>
      </div>

      <div className="loginPage__body">
        <div className="loginPage__blackBox">
          {successMessage ? (
            <div className="successMessage">
              <h2>{successMessage}</h2>
              <button className="loginPage__getStarted" onClick={handleLoginClick}>
                Login
              </button>
            </div>
          ) : showSetupScreen ? (
            <div className="setup-screen">
              <h1>Finish setting up your account</h1>
              <p>Create a password or request a sign-up link to use CinemaHub without a password on any device at any time.</p>
              <form onSubmit={handlePasswordCreate}>
                <div className="loginPage__input"> {/* Container for input */}
                  <input
                    type="password"
                    placeholder="Create a password"
                    required
                    value={password} // Bind value to state
                    onChange={(e) => setPassword(e.target.value)} // Update state on change
                  />
                </div>
                <button className="loginPage__getStarted" type="submit">
                  Create Password
                </button>
              </form>
              <p>Step 1 of 2</p>
            </div>
          ) : showSignInForm ? (
            <div className="sign-in-form">
              <h1>Sign In</h1>
              <form onSubmit={onLoginSubmit}>
                <div className="loginPage__input"> {/* Container for input */}
                  <input type="email" placeholder="Email or mobile number" required />
                </div>
                <div className="loginPage__input"> {/* Container for input */}
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password} // Bind value to state
                    onChange={(e) => setPassword(e.target.value)} // Update state on change
                  />
                </div>
                <button className="loginPage__getStarted" type="submit">
                  Sign In
                </button>
              </form>
              <div className="loginPage__options">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <button className="loginPage__forgotPassword" onClick={() => console.log('Forgot password clicked')}>
                  Forgot password?
                </button>
              </div>
              <div className="loginPage__signup">
                <p>
                  New to <strong className="cinemaHub">CinemaHub</strong>?
                  <button className="loginPage__signupButton" onClick={() => console.log('Sign up clicked')}>
                    Sign up now.
                  </button>
                </p>
              </div>
            </div>
          ) : (
            <div className="get-started">
              <h1>Unlimited movies</h1>
              <h3>Ready to watch? Enter your email to create an account.</h3>
              <form onSubmit={handleGetStartedClick}>
                <div className="loginPage__input"> {/* Container for input */}
                  <input type="email" placeholder="Email address" required />
                </div>
                <button className="loginPage__getStarted" type="submit">
                  Get Started
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

