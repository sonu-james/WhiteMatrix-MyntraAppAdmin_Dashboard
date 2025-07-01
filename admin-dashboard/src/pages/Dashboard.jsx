
import OverViewCards from '../component/OverViewCards';
import React, { useEffect, useState } from 'react';
import RevenueChart from '../component/RevenueChart';
import TopSellingProductsChart from '../component/TopSellingProductsChart';
import Navbar from '../component/Navbar';
const Dashboard = () => {

  return (
    <div className="mx-5 my-3" >
     {/* <Navbar/> */}
      <h4 className="mb-4">Admin Dashboard</h4>
      {/* <OverviewCards data={data} /> */}
       <OverViewCards />
      {/* Charts Section */}
      <div className="row">
        {/* Revenue Chart */}
        <div className="col-md-6">
          <h5 className="mb-3 mt-2">Revenue Chart</h5>
          <RevenueChart />
        </div>

        {/* Top Selling Products Chart */}
        <div className="col-md-6">
          <h5 className="mb-3 mt-2">Top Selling Products</h5>
          <TopSellingProductsChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

