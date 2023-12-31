import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../components/admin/Navbar';
import Sidebar from '../components/admin/Sidebar';
import Home from '../pages/admin/Home'; // Make sure to import your Home component with proper casing

const Admin = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className={`wrapper ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="content-wrapper overflow-auto">
        {children}
      </div>
      <Sidebar />
      
    </div>
  );
};

export default Admin;
