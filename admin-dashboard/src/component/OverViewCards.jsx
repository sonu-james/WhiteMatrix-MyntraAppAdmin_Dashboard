import React from 'react';
import { FaShoppingCart, FaMoneyBillWave, FaUsers, FaBox } from 'react-icons/fa';

const OverViewCards = ({ data }) => {
  return (
    <div className="row">
      {/* Total Orders */}
      <div className="col-md-3 mb-3">
        <div className="card bg-primary text-white shadow-sm">
          <div className="card-body d-flex align-items-center justify-content-between">
            <div>
              <h5 className="card-title">Total Orders</h5>
              <h3>145</h3>
              {/* <h3>{data.orders}</h3> */}
            </div>
            <FaShoppingCart size={40} />
          </div>
        </div>
      </div>

      {/* Total Sales */}
      <div className="col-md-3 mb-3">
        <div className="card bg-success text-white shadow-sm">
          <div className="card-body d-flex align-items-center justify-content-between">
            <div>
              <h5 className="card-title">Total Sales</h5>
              <h3>50000</h3>
              {/* <h3>₹{data.sales}</h3> */}
            </div>
            <FaMoneyBillWave size={40} />
          </div>
        </div>
      </div>

      {/* Total Users */}
      <div className="col-md-3 mb-3">
        <div className="card bg-info text-white shadow-sm">
          <div className="card-body d-flex align-items-center justify-content-between">
            <div>
              <h5 className="card-title">Total Users</h5>
              <h3>324</h3>
              {/* <h3>{data.users}</h3> */}
            </div>
            <FaUsers size={40} />
          </div>
        </div>
      </div>

      {/* Total Products */}
      <div className="col-md-3 mb-3">
        <div className="card bg-secondary text-white shadow-sm">
          <div className="card-body d-flex align-items-center justify-content-between">
            <div>
              <h5 className="card-title">Total Products</h5>
              <h3>120</h3>
              {/* <h3>{data.products}</h3> */}
            </div>
            <FaBox size={40} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverViewCards;
