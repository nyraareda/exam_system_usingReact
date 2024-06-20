import React from 'react';
import Sidebar from '../Sidebar';
import Nav from '../../Auth/Nav';
import './teacherDashboard.css';

const TeacherDashboard = () => {
  return (
    <>
      <div className="dashboard">
        <Sidebar userType="teacher" />
        <div className="content">
          <h2>Teacher Dashboard</h2>
          {/* Content specific to teacher dashboard */}
        </div>
      </div>
    </>
  );
};

export default TeacherDashboard;
