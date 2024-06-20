import React from 'react';
import { Outlet } from 'react-router-dom';

import Nav from '../../Auth/Nav';
import Sidebar from '../Sidebar';

const DashboardLayout = ({ role }) => {
    return (

        <>
        <Nav></Nav>
      
      <div className="dashboard-layout">
       
        <div className="main-content">
          <Outlet />
        </div>
      </div>
        </>
    );
  };
  
  export default DashboardLayout;