import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
   <nav className="navbar navbar-expand-md p-3" style={{ backgroundColor: '#003049' }}>
  <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
    
    {/* Left Section: My Dashboard + Search */}
    <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3 w-100 w-md-auto mb-2 mb-md-0">
      {/* Title */}
      <h5 className="text-white mb-0">My Dashboard</h5>

      {/* Search Input */}
      <div className="position-relative" style={{ maxWidth: '300px', width: '100%' }}>
        <input
          type="text"
          className="form-control ps-5 pe-3 py-2 rounded-pill shadow-sm w-100"
          placeholder="Search anything..."
          aria-label="Search"
          style={{ border: '1px solid #ced4da' }}
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="position-absolute text-muted"
          style={{
            top: '50%',
            left: '15px',
            transform: 'translateY(-50%)',
            pointerEvents: 'none'
          }}
        />
      </div>
    </div>

    {/* Right Section: Icons + Logout */}
    <div className="d-flex align-items-center gap-3">
      <FontAwesomeIcon
        icon={faEnvelope}
        size="lg"
        className="text-white"
        style={{ cursor: 'pointer' }}
      />
      <FontAwesomeIcon
        icon={faBell}
        size="lg"
        className="text-white"
        style={{ cursor: 'pointer' }}
      />
      <button className="btn btn-outline-light" onClick={handleLogout}>
        Logout
      </button>
    </div>
  </div>
</nav>

  );
}

export default Navbar;
