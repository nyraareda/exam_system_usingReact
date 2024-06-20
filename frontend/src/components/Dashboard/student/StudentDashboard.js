import React from 'react';
import Sidebar from '../Sidebar';
import Nav from '../../Auth/Nav';
import './studentDashboard.css';

const StudentDashboard = () => {
  return (
    <>
      <div className="dashboard">
        <Sidebar userType="student" />
        <div className="content">
          <h2>Student Dashboard</h2>
          {/* Content specific to student dashboard */}
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
