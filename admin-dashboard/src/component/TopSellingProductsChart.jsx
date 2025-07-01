import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { getTopSellingCategoriesApi } from '../services/allApi';

const TopSellingProductsChart = () => {
  const [topSellingCategory, setTopSellingCategory] = useState([])
  const getTopSellingCategory = async( )=>{
    const result = await getTopSellingCategoriesApi()
    console.log(result.data);
    setTopSellingCategory(result.data)
  }
  useEffect(()=>{
    getTopSellingCategory()
  },[])
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h6 className="card-title">Top Selling Category</h6>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            layout="vertical"
            data={topSellingCategory}
            margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Bar dataKey="unitsSold" fill="#0d6efd" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopSellingProductsChart;
