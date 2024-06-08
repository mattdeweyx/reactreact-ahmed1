import React, { useState, useEffect } from 'react';
import './Checkorders.css';
import Logout from '../../Logout/Logout';
import { BASE_URL, getBearerTokenFromCookies } from '../../../config';

const CheckOrders = () => {
  const [orders, setOrders] = useState([]);
  const [noOrders, setNoOrders] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = getBearerTokenFromCookies();
        console.log('Token:', token);
        console.log('Fetching orders from:', `${BASE_URL}api/orders`);
        const response = await fetch(`${BASE_URL}api/orders`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            'Authorization': token,
          },
        });
        if (!response.ok) {
          if (response.status === 401) {
            setError('Unauthorized access. Please log in again.');
          } else {
            throw new Error(`HTTP error ${response.status}`);
          }
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        if (data.length > 0) {
          setOrders(data);
        } else {
          setNoOrders(true);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders. Please try again later.');
      }
    };

    fetchOrders();
  }, []);

  const handleValidate = (orderId) => {
    // Implement validation logic here, for example, send a request to your server
    console.log(`Validating order with ID ${orderId}`);
  };

  return (
    <div className="orders-container">
      <div className="orders-sidebar">
        <h2><a href="/">Dashboard</a></h2>
        <ul>
          <li><a href="/Addproduct">Add Product</a></li>
          <li><a href="/Checkproducts">Checkout Products</a></li>
          <li><a href="/CheckOrders">Check Orders</a></li>
          <li><a href="/Validorders">Valid Orders</a></li>
          <li><a href="/Newadmuser">Users/Admins</a></li>
        </ul>
        <Logout />
      </div>
      <div className="orders-main-content">
        <h2>CHECK ORDERS</h2>

        {error ? (
          <p>Error: {error}</p>
        ) : noOrders ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order-card">
              <p>Order ID: {order.order_id}</p>
              <p>Address: {order.address}</p>
              <p>Contact: {order.phone}</p>
              <p>Total: {order.total_amount}</p>
              <div>Status: {order.status}</div>
              <button onClick={() => handleValidate(order.id)}>Validate</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CheckOrders;
