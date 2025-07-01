// FilterTabs.js
import React from 'react';
import '../../pages/Orders.css'

const FilterTabs = ({ filter, setFilter }) => {
  const filters = ['All', 'Pending', 'Shipped', 'Delivered'];

  return (
    <ul className="nav nav-tabs">
      {filters.map((status) => (
        <li className="nav-item" key={status}>
          <button
            className={`nav-link ${filter === status ? 'active' : ''}`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FilterTabs;
