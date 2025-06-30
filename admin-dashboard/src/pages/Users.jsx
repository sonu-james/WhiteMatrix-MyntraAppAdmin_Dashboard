
import React from 'react';

const Users = () => {
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '9876543210',
      role: 'Customer',
      status: 'Active',
      joined: '2024-11-20',
      avatar: 'https://i.pravatar.cc/100?img=1',
    },
    {
      id: 2,
      name: 'Aisha Khan',
      email: 'aisha@example.com',
      phone: '9123456780',
      role: 'Admin',
      status: 'Blocked',
      joined: '2023-09-15',
      avatar: 'https://i.pravatar.cc/100?img=2',
    },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Users</h2>
      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="rounded-circle"
                    style={{ width: '40px', height: '40px' }}
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>
                  <span className={`badge ${user.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.joined}</td>
                <td>
                  <button className="btn btn-sm btn-info me-1">View</button>
                  <button className="btn btn-sm btn-warning me-1">Edit</button>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;

