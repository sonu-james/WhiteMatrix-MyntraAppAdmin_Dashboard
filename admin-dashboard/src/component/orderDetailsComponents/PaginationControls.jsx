// PaginationControls.js
import React from 'react';

const PaginationControls = ({ totalPages, currentPage, paginate }) => {
  return (
    totalPages > 1 && (
      <div className="d-flex justify-content-center mt-3">
        <nav>
          <ul className="pagination pagination-sm dark-blue-pagination">
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    )
  );
};

export default PaginationControls;
