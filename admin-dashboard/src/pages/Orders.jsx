import React from 'react';
import './Orders.css'; // optional CSS styling

const Orders = () => {
  const orders = [
    {
      id: 'ORD123456',
      customerName: 'John Doe',
      date: '2025-06-27',
      paymentMethod: 'UPI',
      paymentStatus: 'Paid',
      totalAmount: 1898,
      status: 'Shipped',
      products: [
        {
          name: 'Stylish Shirt',
          image: 'https://4.imimg.com/data4/AL/SN/MY-13188030/men-s-stylish-shirt-500x500.jpg',
          variant: 'M / Blue',
          quantity: 2,
          price: 499,
        },
        {
          name: 'Classic Jeans',
          image: 'https://tse1.mm.bing.net/th/id/OIP.rfkHdsWbdMMcpEloRKZrPQHaJQ?pid=Api&P=0&h=220',
          variant: '32 / Black',
          quantity: 1,
          price: 900,
        },
      ],
    },
    {
      id: 'ORD789012',
      customerName: 'Aisha Khan',
      date: '2025-06-25',
      paymentMethod: 'COD',
      paymentStatus: 'Pending',
      totalAmount: 1299,
      status: 'Pending',
      products: [
        {
          name: 'Floral Dress',
          image: 'https://tse3.mm.bing.net/th/id/OIP.E4iDXf6qIOkDg2xLudAILAHaJn?pid=Api&P=0&h=220',
          variant: 'L / Pink',
          quantity: 1,
          price: 1299,
        },
      ],
    },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Orders</h2>

      {orders.map((order) => (
        <div className="card mb-4 shadow-sm rounded" key={order.id}>
          <div className="card-header bg-dark text-white fw-semibold">
            Order #{order.id} | {order.customerName} | ₹{order.totalAmount} | {order.status}
          </div>
          <div className="card-body">
            <p><strong>Payment:</strong> {order.paymentMethod} ({order.paymentStatus})</p>
            <p><strong>Date:</strong> {order.date}</p>

            <div className="table-responsive">
              <table className="table table-bordered align-middle text-center">
                <thead className="table-secondary">
                  <tr>
                    <th>Product</th>
                    <th>Variant</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((product, idx) => (
                    <tr key={idx}>
                      <td className="text-start d-flex align-items-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: '10px' }}
                        />
                        {product.name}
                      </td>
                      <td>{product.variant}</td>
                      <td>{product.quantity}</td>
                      <td>₹{product.price}</td>
                      <td>₹{product.quantity * product.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;

