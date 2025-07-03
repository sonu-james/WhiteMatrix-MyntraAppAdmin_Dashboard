import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import Orders from '../pages/Orders';
import Users from '../pages/Users';
import Sidebar1 from './Sidebar1';
import Navbar from './Navbar';
import AdManager from '../pages/AdManager';

function MainLayout() {
  const location = useLocation();
  const hideLayout = location.pathname === '/';

  return (
    <div className="d-flex flex-column flex-md-row vh-100 overflow-hidden">
      {/* Sidebar - hidden on login page */}
      {!hideLayout && (
        <div className="sidebar-wrapper d-none d-md-block">
          <Sidebar1 />
        </div>
      )}

      <div className="flex-grow-1 d-flex flex-column overflow-auto">
        {/* Navbar - hidden on login page */}
        {!hideLayout && <Navbar />}

        {/* Main Content */}
        <main className="flex-grow-1 p-3 p-sm-4 overflow-auto">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/users" element={<Users />} />
             <Route path="/admanager" element={<AdManager/>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
