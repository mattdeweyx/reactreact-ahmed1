import React, { useState, useEffect } from 'react';
import './Checkusers.css';
import Dashboardicon from '../../Assets/dashboard.png';
import {
  BASE_URL,
  parseErrorMessage,
  getBearerTokenFromCookies,
  getRoleFromCookies
}
  from '../../../config';

const Checkusers = () => {
  const [users, setUsers] = useState([]);
  const [noUsers, setNoUsers] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BASE_URL}api/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true', // Assuming you need this header
            'Authorization': getBearerTokenFromCookies(),
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        if (data.length > 0) {
          console.log(data);
          setUsers(data);
        } else {
          setNoUsers(true);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users. Please try again later.');
      }
    };
    fetchUsers();
  }, []);
  
  function logout() {

  }

  return (
    <div className="users-container">
      <div className="users-sidebar">
        <h2><a href="/">Dashboard</a></h2>
        <ul>
          <li>
            <a href="/Addproduct" >
              Add Product
            </a>
          </li>
          <li>
            <a href="/Checkproducts" >
              Checkout Products
            </a>
          </li>
          <li>
            <a href="/CheckOrders">
              Check Orders
            </a>
          </li>
          <li>
            <a href="/Checkusers">
              Check Users
            </a>
          </li>
          <li>
            <a href="/Checkadmins">
              Check Admins
            </a>
          </li>
          <li>
            <a href="/Validorders">
              Valid Orders
            </a>
          </li>
          <li>
            <a href="/Newadmuser">
              Add New account
            </a>
          </li>
        </ul>
        <button onClick={logout}>Logout</button>
      </div>
      <div className="users-main-content">
        <h2>CHECK USERS</h2>
        {error ? (
          <p>Error: {error}</p>
        ) : noUsers ? (
          <p>No users found.</p>
        ) : (
          users.map((user) => (
            <div key={user.id} className="user-card">
              <p>Full Name: {user.fullname}</p>
              <p>Email: {user.email}</p>
              <p>Registration Time: {user.regtime}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Checkusers;