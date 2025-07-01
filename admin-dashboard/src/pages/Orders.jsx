import React, { useEffect, useState } from 'react';
import OrderDetailsModal from '../component/orderDetailsComponents/OrderDetailsModal';
import { getAllOrdersApi, updateOrderStatus } from '../services/allApi';
import FilterTabs from '../component/orderDetailsComponents/FilterTabs';
import DateRangePicker from '../component/orderDetailsComponents/DateRangePicker';
import OrdersTable from '../component/orderDetailsComponents/OrdersTable';
import PaginationControls from '../component/orderDetailsComponents/PaginationControls';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 15;

  const getFormattedDate = (date) => {
  return date.toISOString().split('T')[0]; // format: yyyy-mm-dd
};

  const getAllOrders = async () => {
    try {
      const result = await getAllOrdersApi();
      setOrders(result.data.orders || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };
useEffect(() => {
  const today = new Date();
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(today.getDate() - 2);

  setStartDate(getFormattedDate(twoDaysAgo));
  setEndDate(getFormattedDate(today));

  getAllOrders();
}, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const result = await updateOrderStatus({ newStatus }, orderId);
      if (result.status === 200) {
        const updated = orders.map((o) =>
          o._id === orderId ? { ...o, status: newStatus } : o
        );
        setOrders(updated);
        getAllOrders(); // optional: refetch
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filter === 'All' || order.status === filter;
    const orderDate = new Date(order.placedAt);
    const matchesDate =
      (!startDate || orderDate >= new Date(startDate)) &&
      (!endDate || orderDate <= new Date(endDate));
    return matchesStatus && matchesDate;
  });

  const indexOfLast = currentPage * ordersPerPage;
  const indexOfFirst = indexOfLast - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <FilterTabs filter={filter} setFilter={(val) => { setFilter(val); setCurrentPage(1); }} />
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          setStartDate={(val) => { setStartDate(val); setCurrentPage(1); }}
          setEndDate={(val) => { setEndDate(val); setCurrentPage(1); }}
        />
      </div>

      <div className="table-responsive">
        <OrdersTable orders={currentOrders} onView={(order) => { setSelectedOrder(order); setShowModal(true); }} />
      </div>

      <PaginationControls
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={setCurrentPage}
      />

      {selectedOrder && (
        <OrderDetailsModal
          show={showModal}
          order={selectedOrder}
          onClose={() => setShowModal(false)}
          onStatusChange={(id, newStatus) => {
            handleStatusChange(id, newStatus);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Orders;
