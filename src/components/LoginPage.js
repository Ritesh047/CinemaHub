import React, { useState } from 'react';
import './LoginPage.css'; // Ensure you create a CSS file for styling

const LoginPage = ({ onLoginSubmit }) => {
  const [showSignInForm, setShowSignInForm] = useState(false);

  // Toggle between showing sign-in form and the default view
  const handleSignInClick = () => {
    setShowSignInForm(true);
  };

  return (
    <div className="loginPage">
      <div className="loginPage__background">
        {!showSignInForm && (
          <button className="loginPage__signInButton" onClick={handleSignInClick}>
            Sign In
          </button>
        )}
        <div className="loginPage__gradient"></div>
      </div>
      
      <div className="loginPage__body">
        <div className="loginPage__blackBox">
          {showSignInForm ? (
            <>
              <h1>Sign In</h1>
              <div className="loginPage__input">
                <form onSubmit={onLoginSubmit}>
                  <input
                    type="email"
                    placeholder="Email or mobile number"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                  />
                  <button className="loginPage__getStarted" type="submit">
                    Sign In
                  </button>
                </form>
              </div>
              <div className="loginPage__options">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <button className="loginPage__forgotPassword" onClick={() => console.log('Forgot password clicked')}>
                  Forgot password?
                </button>
              </div>
              <div className="loginPage__signup">
                <p>New to CinemaHub? 
                  <button className="loginPage__signupButton" onClick={() => console.log('Sign up clicked')}>
                    Sign up now.
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
              <h1>Unlimited movies</h1>
              <h3>
                Ready to watch? Enter your email to create an account.
              </h3>
              
              <div className="loginPage__input">
                <form onSubmit={onLoginSubmit}>
                  <input
                    type="email"
                    placeholder="Email address"
                    required
                  />
                  <button className="loginPage__getStarted" type="submit">
                    Get Started
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
