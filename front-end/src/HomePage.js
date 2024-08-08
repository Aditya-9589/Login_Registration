// src/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to MyApp</h1>
      <div className="buttons">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/registration" className="btn">Register</Link>
      </div>
    </div>
  );
};

export default HomePage;
