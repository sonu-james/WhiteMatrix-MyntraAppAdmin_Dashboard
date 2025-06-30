
import OverViewCards from '../component/OverViewCards';
import React, { useEffect, useState } from 'react';
import RevenueChart from '../component/RevenueChart';
import TopSellingProductsChart from '../component/TopSellingProductsChart';
import Navbar from '../component/Navbar';
const Dashboard = () => {

//  const [dailyRevenue, setDailyRevenue] = useState([]);
//   const [weeklyRevenue, setWeeklyRevenue] = useState([]);
//   const [monthlyRevenue, setMonthlyRevenue] = useState([]);

//  useEffect(() => {
//     // Fetch from backend
//     fetch('/api/admin/revenue')
//       .then(res => res.json())
//       .then(data => {
//         setDailyRevenue(data.daily);
//         setWeeklyRevenue(data.weekly);
//         setMonthlyRevenue(data.monthly);
//       });
//   }, []);

// Dummy monthly revenue data
const monthlyRevenue = [
  { label: 'Jan', revenue: 21000 },
  { label: 'Feb', revenue: 19500 },
  { label: 'Mar', revenue: 25000 },
  { label: 'Apr', revenue: 23000 },
  { label: 'May', revenue: 27000 },
  { label: 'Jun', revenue: 26000 },
  { label: 'Jul', revenue: 30000 },
  { label: 'Aug', revenue: 28000 },
  { label: 'Sep', revenue: 25500 },
  { label: 'Oct', revenue: 29000 },
  { label: 'Nov', revenue: 31000 },
  { label: 'Dec', revenue: 32000 }
];

//for barchart
// Dummy data
const topProducts = [
  { name: 'T-Shirt', unitsSold: 1200 },
  { name: 'Sneakers', unitsSold: 950 },
  { name: 'Backpack', unitsSold: 800 },
  { name: 'Sunglasses', unitsSold: 650 },
  { name: 'Wrist Watch', unitsSold: 500 }
];

  // const [data, setData] = useState({
  //   orders: 0,
  //   sales: 0,
  //   users: 0,
  //   products: 0
  // });

  // useEffect(() => {
  //   // Example: Fetch summary data from your backend API
  //   fetch('/api/admin/summary')
  //     .then(res => res.json())
  //     .then(result => setData(result));
  // }, []);

  return (
    <div className="container">
     {/* <Navbar/> */}
      <h4 className="mb-4">Admin Dashboard</h4>
      {/* <OverviewCards data={data} /> */}
       <OverViewCards />
      {/* Charts Section */}
      <div className="row">
        {/* Revenue Chart */}
        <div className="col-md-6">
          <h5 className="mb-3 mt-2">Revenue Chart</h5>
          <RevenueChart data={monthlyRevenue} title="Monthly Revenue Overview" />
        </div>

        {/* Top Selling Products Chart */}
        <div className="col-md-6">
          <h5 className="mb-3 mt-2">Top Selling Products</h5>
          <TopSellingProductsChart data={topProducts} title="Top Products (by Units Sold)" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

