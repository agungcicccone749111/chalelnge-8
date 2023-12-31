// Navbar.jsx
import React, { useEffect } from 'react';
import { useAuth } from '../../AuthenticationContext';
import { useNavigate } from 'react-router';

const Navbar = ({ toggleSidebar }) => {
  const { getToken, logout } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    // If a token is not present, redirect to the login page
    const token = getToken();
    if (!token) {
      nav('/login');
    }
  }, [getToken, nav]);

  const handleLogout = () => {
    logout();
    nav('/login');
  };

  return (
    <nav className="main-header navbar navbar-expand navbar-dark">
      <button
        type="button"
        className="btn btn-link sidebar-toggle"
        onClick={toggleSidebar}
      >
        <i className="fas fa-bars"></i>
      </button>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <button className="btn btn-link" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
