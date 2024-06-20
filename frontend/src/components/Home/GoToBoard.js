import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './GoToBoard.css';
import ButtonPrimary from '../buttons/ButtonPrimary';
import Nav from '../Auth/Nav';

export default function GoToBoard() {
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'user') {
      navigate('/student-dashboard'); // Redirect to student dashboard if role is user
    } else if (userRole === 'admin') {
      navigate('/teacher-dashboard'); // Redirect to teacher dashboard if role is admin
    } else {
      navigate('/login'); // Redirect to login if role is not recognized
    }
  }, [navigate]);

  return (
    <div className="GoToBoard">
      <Nav /> 
      <div className="bottom-wrap">
        {localStorage.getItem('userRole') === 'user' && (
          <div className="gtb student">
            <div className="title">Student</div>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <Link to="/student-dashboard">
              <ButtonPrimary>Student Dashboard</ButtonPrimary>
            </Link>
          </div>
        )}
        {localStorage.getItem('userRole') === 'admin' && (
          <div className="gtb teacher">
            <div className="title">Teacher</div>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <Link to="/teacher-dashboard">
              <ButtonPrimary>Teacher Dashboard</ButtonPrimary>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
