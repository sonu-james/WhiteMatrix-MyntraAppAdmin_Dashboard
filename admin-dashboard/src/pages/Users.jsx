import React, { useEffect, useState } from 'react';
import { deleteAUserApi, getAllUsersApi } from '../services/allApi';
import { formatDate } from '../utils/helpers';
import './Users.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
const [showViewModal, setShowViewModal] = useState(false);
/*  const [showEditModal, setShowEditModal] = useState(false);
 const [newUsername, setNewUsername] = useState('');
 */
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 15;

  // View modal trigger
const handleView = (user) => {
  setSelectedUser(user);
  setShowViewModal(true);
};

const handleDelete = async (userId) => {
  console.log(userId);
  
   const confirmDelete = window.confirm('Are you sure you want to delete this user?');
  if (confirmDelete) {
    try {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      console.log(token);
      

      const res = await deleteAUserApi(userId, reqHeader);
      console.log(res);
      
      if (res.status === 200) {
        alert('User deleted successfully');
        getAllUsers();
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete user');
    } 
  }
};

  const getAllUsers = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        };
        const result = await getAllUsersApi(reqHeader);
        setUsers(result.data.user);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const status = "Active";

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Users</h2>

      <div style={{ maxHeight: '550px', overflowY: 'auto' }} className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.username ? user.username : user.email.split('@')[0]}</td>
                <td>{user.email}</td>
                <td>Customer</td>
                <td>
                  <span className={`badge ${status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                    {status}
                  </span>
                </td>
                <td>{formatDate(user.createdAt)}</td>
                <td>
                  <button className="btn btn-sm btn-info me-1" onClick={() => handleView(user)}><FontAwesomeIcon icon={faEye} /></button>
{/*                   <button className="btn btn-sm btn-warning me-1">Edit</button>
 */}                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user._id)}><FontAwesomeIcon icon={faTrash} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <nav className="mt-3 d-flex justify-content-center">
        <ul className="pagination">
          {[...Array(totalPages)].map((_, idx) => (
            <li key={idx} className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(idx + 1)}>
                {idx + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* View Modal */}
{selectedUser && (
  <div className={`modal fade ${showViewModal ? 'show d-block' : ''}`} tabIndex="-1">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">User Details</h5>
          <button type="button" className="btn-close" onClick={() => setShowViewModal(false)}></button>
        </div>
        <div className="modal-body">
          <p><strong>Name:</strong> {selectedUser.username || selectedUser.email.split('@')[0]}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Mobile:</strong> {selectedUser.mobile}</p>
          <p><strong>DOB:</strong> {new Date(selectedUser.dob).toLocaleDateString()}</p>
          <p><strong>Gender:</strong> {selectedUser.gender}</p>
          <p><strong>Admin:</strong> {selectedUser.isAdmin ? 'Yes' : 'No'}</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
        </div>
      </div>
    </div>
  </div>
)}



    </div>
  );
};

export default Users;
