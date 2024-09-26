import React from 'react';
import './LoginPage.css'; // Ensure you create a CSS file for styling

const LoginPage = ({ onLoginSubmit }) => {
  return (
    <div className="loginPage">
      <div className="loginPage__background">
        <img
          className="loginPage__logo"
          src="your_cinema_hub_logo_url" // Replace with CinemaHub logo URL
          alt="CinemaHub Logo"
        />
        <button className="loginPage__signInButton">Sign In</button>
        <div className="loginPage__gradient"></div>
      </div>
      
      <div className="loginPage__body">
        <h1>Unlimited movies</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <h3>
          Ready to watch? Enter your email to create account.
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
      </div>
    </div>
  );
};

export default LoginPage;
