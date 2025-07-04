import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaMoneyBillWave, FaUsers, FaBox } from 'react-icons/fa';
import { getAllOrdersApi, getAllProductsApi, getAllUsersApi, getAllUsersCountApi } from '../services/allApi';

const OverViewCards = ({ data }) => {

  const [totalOrders, setTotalOrders] = useState(0)
  const [totalUser, setTotalUser] = useState(0)
  const [totalProducts, setTotalProducts] = useState(0)
  const [orders, setOrders] = useState([])
  const [totalSales, setTotalSales] = useState(0);

  const getAllOrders = async () => {
  try {
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      console.log(token);
      
      const reqHeader = {
       "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
 
    const result = await getAllOrdersApi(reqHeader);
    const fetchedOrders = result.data.orders || [];
    
    setOrders(fetchedOrders);
    setTotalOrders(fetchedOrders.length);

    // Calculate total sales
    const total = fetchedOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    setTotalSales(total);
    }
  } catch (err) {
    console.error('Error fetching orders:', err);
  }
};
const getAllUsersCount = async () => {
  try {
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")      
      const reqHeader = {
       "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
 
    const result = await getAllUsersCountApi(reqHeader);    
    setTotalUser(result.data.totalNonAdminUsers);
 
    }
  } catch (err) {
    console.error('Error fetching orders:', err);
  }
};
const getAllProducts = async()=>{
  try {
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      console.log(token);
      
      const reqHeader = {
       "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
 
    const result = await getAllProductsApi(reqHeader);
    const fetchedProducts = result.data || [];
    setTotalProducts(fetchedProducts.length); 

    } 
  } catch (err) {
    console.error('Error fetching orders:', err);
  }
}
  useEffect(() => {  
    getAllOrders();
    getAllUsersCount()
    getAllProducts()
    
  }, []);
//console.log(orders);

  return (
    <div className="row mt-2 ">
      {/* Total Orders */}
      {/* <h3 className='text-primary '><b>Sales Summary</b></h3>
      <h5 className='text-primary mb-3'>Sales Summary</h5> */}
      <div className="col-md-3 mb-3">
        <div className="card bg-primary text-white shadow-sm">
          <div className="card-body d-flex align-items-center justify-content-between">
            <div >
              <h4 className="card-title">Total Orders</h4>
              <h5>{totalOrders}</h5>
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
<h5>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalSales)}</h5>
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
              <h5>{totalUser}</h5>
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
              <h5>{totalProducts}</h5>
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
