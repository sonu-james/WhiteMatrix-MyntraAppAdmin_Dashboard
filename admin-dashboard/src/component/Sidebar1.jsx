import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBars,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaTachometerAlt
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar1 = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Toggle Button (Visible on small screens) */}
      <button
        className="btn btn-outline-secondary d-md-none m-2"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
       className={`text-white p-4 ${isOpen ? 'd-block' : 'd-none'} d-md-block sidebar-fixed`}
      >
        {/* Admin Info */}
        <div className="d-flex flex-column align-items-center mb-4">
          <img
            src="https://www.pngall.com/wp-content/uploads/5/Profile-Transparent.png"
            alt="Admin"
            className="rounded-circle mb-2"
            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
          />
          <h6 className="fw-semibold mb-0">Admin Name</h6>
        </div>

        {/* Menu */}
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/dashboard" className="nav-link text-white px-2 py-2 rounded hover-effect">
              <FaTachometerAlt className="me-2" />
              Dashboard
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/products" className="nav-link text-white px-2 py-2 rounded hover-effect">
              <FaBox className="me-2" />
              Products
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/orders" className="nav-link text-white px-2 py-2 rounded hover-effect">
              <FaShoppingCart className="me-2" />
              Orders
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/users" className="nav-link text-white px-2 py-2 rounded hover-effect">
              <FaUsers className="me-2" />
              Users
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar1;
