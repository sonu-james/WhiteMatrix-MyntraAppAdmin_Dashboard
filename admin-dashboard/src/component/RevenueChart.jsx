import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import { getMonthlyRevenueApi, getWeeklyRevenueApi } from '../services/allApi';

const RevenueChart = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState([])
  const getWeeklyRevenue = async()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      
      const reqHeader = {
       "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
 
    const result = await getWeeklyRevenueApi(reqHeader)
  // console.log(result);
    setMonthlyRevenue(result.data)
  }}
  useEffect(()=>{
getWeeklyRevenue();
  },[])
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h6 className="card-title">Weekly Revenue Overview</h6>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyRevenue}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#007bff" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
