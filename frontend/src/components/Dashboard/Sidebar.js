// src/components/Dashboard/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import the CSS file

const Sidebar = ({ userType }) => {
  const sidebarItems =
    userType === 'student'
      ? [
          { label: 'Results', path: '/user-result' },
          { label: 'Exams', path: '/exams' },
        ]
      : [
          { label: 'Students', path: '/admin-result' },
          { label: 'Create Exam', path: '/create-exam' },
        ];

  return (
    <div className="sidebar">
      <ul>
        {sidebarItems.map((item, index) => (
          <li key={index}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
