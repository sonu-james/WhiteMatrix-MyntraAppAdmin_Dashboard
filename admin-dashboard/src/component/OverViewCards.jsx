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
              <h4 className="card-title">Total Orders</h4>
              <h5>145</h5>
              {/* <h3>{data.orders}</h3> */}
            </div>
            <FaShoppingCart size={35} />
          </div>
        </div>
      </div>

      {/* Total Sales */}
      <div className="col-md-3 mb-3">
        <div className="card bg-success text-white shadow-sm">
          <div className="card-body d-flex align-items-center justify-content-between">
            <div>
              <h4 className="card-title">Total Sales</h4>
              <h5>50000</h5>
              {/* <h3>₹{data.sales}</h3> */}
            </div>
            <FaMoneyBillWave size={35} />
          </div>
        </div>
      </div>

      {/* Total Users */}
      <div className="col-md-3 mb-3">
        <div className="card bg-info text-white shadow-sm">
          <div className="card-body d-flex align-items-center justify-content-between">
            <div>
              <h4 className="card-title">Total Users</h4>
              <h5>324</h5>
              {/* <h3>{data.users}</h3> */}
            </div>
            <FaUsers size={35} />
          </div>
        </div>
      </div>

      {/* Total Products */}
      <div className="col-md-3 mb-3">
        <div className="card bg-secondary text-white shadow-sm">
          <div className="card-body d-flex align-items-center justify-content-between">
            <div>
              <h4 className="card-title">Total Products</h4>
              <h5>120</h5>
              {/* <h3>{data.products}</h3> */}
            </div>
            <FaBox size={35} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverViewCards;
