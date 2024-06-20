import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import BGNav from '../../assets/images/bg-nav.png';
import './Nav.css';

const Nav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole'); 
    navigate('/login');
  };

  const loggedIn = localStorage.getItem('userRole');

  const navStyle = {
    backgroundImage: `url(${BGNav})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom'
  };

  return (
    <AppBar position="static" style={{ marginBottom: '16px' }}>
      <Toolbar style={navStyle}>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          <div className="brand">
            <strong variant="h6" style={{ flexGrow: 1 }}>Exam system</strong>
            
          </div>
        </Link>
        </Typography>
        {loggedIn ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
            <Button component={Link} to="/register" color="inherit">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
