import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Activity, LogOut, User as UserIcon } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <Activity size={24} color="#0284c7" />
        <span>SmartClinic</span>
      </Link>

      <div className="nav-links">
        {user ? (
          <>
            <span className="user-info">
              <UserIcon size={18} /> {user.name} ({user.role})
            </span>
            <Link to="/dashboard" className="nav-btn">Dashboard</Link>
            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/register" className="nav-btn-primary">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;