// Login.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthenticationContext';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { getToken, login, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If a token is present, redirect to the dashboard
    const token = getToken();
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [getToken, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:9000/api/v1/login', {
        username,
        password,
      });

      // Assuming the server responds with a token
      const token = response.data.token;

      // Call the login function with the obtained token
      login(token);

      // Redirect to the admin dashboard after successful login
      navigate('/admin/dashboard');
    } catch (error) {
      // Handle login failure (e.g., show an error message)
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
    <div className="col-6 bg-light rounded p-5">
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <h1 className='text-center'>Login Binar</h1>
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mb-3 mr-4">
          Login
        </button>
        <button type="submit" className="btn btn-primary mb-3">
          Login With Gmail
        </button>
        <br/>
       <a className="text-right"
        href="/forgot-password">Lupa Sandi</a>
      </form>
    </div>
    </div>
  );
};

export default Login;
