// Sidebar.jsx
import React, { useState } from 'react';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
    
  };

  return (
    <aside
      className={`main-sidebar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
    >
      <div className="">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        <li className='nav-item border-bottom m-2'>
            <h2>Binar Car</h2>
        </li>
          <li className="nav-item">
            <a href="/admin/dashboard" className="nav-link">
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>Dashboard</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="/admin/car" className="nav-link">
              <i className="nav-icon fas fa-car"></i>
              <p>Cars</p>
            </a>
          </li>
          
          {/* Add more menu items as needed */}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
