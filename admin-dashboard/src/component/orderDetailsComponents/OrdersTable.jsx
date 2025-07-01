// OrdersTable.js
import React from 'react';
import { formatDate, getStatusBadge } from '../../utils/helpers';

const OrdersTable = ({ orders, onView }) => {
  return (
    <div className='table-wrapper'>
      <table className="table table-hover align-middle text-center orders-table">
        <thead className="table-primary rounded">
          <tr className='rounded'>
            <th>Order ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="7">No orders found.</td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id} className="order-row shadow-sm">
                <td>{order._id}</td>
                <td>{order?.user?.email}</td>
                <td>
                  {order?.shippingAddress?.fullName}, {order?.shippingAddress?.address},{' '}
                  {order?.shippingAddress?.pincode}
                </td>
                <td>{formatDate(order.placedAt)}</td>
                <td>₹{order.totalAmount}</td>
                <td>{getStatusBadge(order.status)}</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary" onClick={() => onView(order)}>
                    View Details
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
