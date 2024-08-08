// src/RegistrationPage.js
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegistrationPage = () => {
  const [registrationData, setRegistrationData] = useState({
    username: '',
    password: '',
  });

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;

    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit Function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/register', registrationData);
      const { message } = response.data;

      console.log(message);
    } catch (error) {
      console.error('Registration error', error);
    }

    setRegistrationData({
      username: '',
      password: '',
    });
  };

  return (
    <div className="registration-container">
      <h1>Registration Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={registrationData.username}
          onChange={handleRegistrationChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={registrationData.password}
          onChange={handleRegistrationChange}
          required
        />

        <button type="submit">Register</button>

        <p>
          Already registered?
          <br />
          <Link to="/login">Login Here</Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationPage;
