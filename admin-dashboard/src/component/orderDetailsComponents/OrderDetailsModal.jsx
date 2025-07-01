import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Helpers
const capitalizeFirst = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
const capitalizeWords = (str) => str ? str.replace(/\b\w/g, char => char.toUpperCase()) : '';
const formatDate = (dateStr) => new Date(dateStr).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending': return 'secondary';
    case 'Processing': return 'info';
    case 'Shipped': return 'primary';
    case 'Delivered': return 'success';
    case 'Cancelled': return 'danger';
    default: return 'dark';
  }
};

const getAllOrderSteps = (timestamps) => [
  { label: 'Placed', date: timestamps?.placedAt },
  { label: 'Shipped', date: timestamps?.shippedAt },
  { label: 'Delivered', date: timestamps?.deliveredAt },
  { label: 'Cancelled', date: timestamps?.cancelledAt }
];

const OrderDetailsModal = ({ show, order, onClose, onStatusChange }) => {
  const [status, setStatus] = useState('');
  console.log(order);
  

  useEffect(() => {
    if (order) {
      setStatus(order.status);
    }
  }, [order]);

  if (!order) {
    return (
      <Modal show={show} onHide={onClose} centered>
        <Modal.Body className="text-center">
          <Spinner animation="border" variant="primary" />
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Order #{order._id}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Customer & Order Info */}
        <Row className="mb-4">
          <Col md={6}>
            <div className="p-3 bg-white rounded border">
              <h6 className="fw-bold">Customer</h6>
              <p className="mb-1">
                <strong>Name:</strong>{' '}
                {capitalizeWords(order.user?.name || order.user?.email?.split('@')[0])}
              </p>
              <p className="mb-1"><strong>Email:</strong> {order.user?.email}</p>
            </div>
          </Col>
          <Col md={6}>
            <div className="p-3 bg-white rounded border">
              <h6 className="fw-bold">Order Info</h6>
              {/* <p className="mb-1"><strong>Placed On:</strong> {formatDate(order.placedAt)}</p>
              <p className="mb-1">
                <strong>Status:</strong>{' '}
                <span className={`badge bg-${getStatusColor(order.status)}`}>{order.status}</span>
              </p> */}
              <p className="mb-1">
                <strong>Payment:</strong> {order.paymentMethod} (
                <span className={`text-${order.paymentStatus === 'Paid' ? 'success' : 'warning'}`}>
                  {order.paymentStatus}
                </span>)
              </p>
              <p className="mb-1"><strong>Total:</strong> ₹{order.totalAmount}</p>
            </div>
          </Col>
        </Row>

        {/* Shipping Address */}
        <div className="p-3 mb-4 bg-white rounded border">
          <h6 className="fw-bold">Shipping Address</h6>
          <p className="mb-0">
            {capitalizeWords(order.shippingAddress?.fullName)},<br />
            {capitalizeWords(order.shippingAddress?.address)},<br />
            {capitalizeWords(order.shippingAddress?.locality)}, {capitalizeFirst(order.shippingAddress?.city)},<br />
            {capitalizeFirst(order.shippingAddress?.state)} - {order.shippingAddress?.pincode}<br />
            <strong>Phone:</strong> {order.shippingAddress?.mobile}
          </p>
        </div>

        {/* Tracking Timeline */}
<div className="p-3 mb-4 bg-white rounded border">
  <h6 className="fw-bold mb-3">Tracking Progress</h6>
  <div className="d-flex align-items-start justify-content-between position-relative" style={{ gap: '0.5rem' }}>
    {getAllOrderSteps(order.statusTimestamps).map((step, index, steps) => {
      const isCompleted = Boolean(step.date);
      const isLast = index === steps.length - 1;

      return (
        <div
          key={index}
          className="text-center position-relative d-flex flex-column align-items-center"
          style={{ flex: 1, minWidth: 80 }}
        >
          {/* Circle + connector wrapper */}
          <div style={{ position: 'relative', width: '100%' }}>
            {/* Circle */}
            <div
              className="rounded-circle border d-flex justify-content-center align-items-center"
              style={{
                width: 36,
                height: 36,
                backgroundColor: isCompleted ? '#198754' : '#fff',
                color: isCompleted ? '#fff' : '#6c757d',
                zIndex: 2,
                margin: '0 auto',
                position: 'relative'
              }}
            >
              {isCompleted ? <i className="bi bi-check-lg" /> : <i className="bi bi-clock" />}
            </div>

            {/* Connector line (to next step) */}
            {!isLast && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  height: 3,
                  width: '100%',
                  backgroundColor:
                    isCompleted && Boolean(steps[index + 1].date) ? '#198754' : '#dee2e6',
                  zIndex: 1,
                  transform: 'translateY(-50%)',
                }}
              ></div>
            )}
          </div>

          {/* Label */}
          <div className={`fw-semibold mt-2 ${isCompleted ? 'text-dark' : 'text-muted'}`}>
            {step.label}
          </div>

          {/* Timestamp */}
          {isCompleted && (
            <div className="small text-muted">{formatDate(step.date)}</div>
          )}
        </div>
      );
    })}
  </div>
</div>




        {/* Ordered Items */}
        <h6 className="fw-bold mb-2">Ordered Items</h6>
        <ul className="list-group mb-4">
          {order.items.map((item, index) => (
            <li key={index} className="list-group-item d-flex align-items-start gap-3">
              <img
                src={item.image}
                alt={item.title}
                style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 6 }}
              />
              <div>
                <strong>{capitalizeWords(item.title)}</strong><br />
                <small className="text-muted">SKU: {item.variantSKU}</small><br />
                <small>Color: {capitalizeFirst(item.color)} | Size: {item.size}</small><br />
                <small>Qty: {item.quantity} | Price: ₹{item.priceAtPurchase}</small>
              </div>
            </li>
          ))}
        </ul>

        {/* Update Status */}
        <Form.Group className="mb-3">
          <Form.Label><strong>Update Order Status</strong></Form.Label>
          <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </Form.Select>
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => onStatusChange(order._id, status)}
          disabled={status === order.status}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderDetailsModal;
