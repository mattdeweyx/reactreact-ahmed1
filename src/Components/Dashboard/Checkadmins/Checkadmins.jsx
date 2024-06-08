import React, { useState, useEffect } from 'react';
import '../Checkusers/Checkusers.css';

const Checkuadmins = () => {
  const [admins, setAdmins] = useState([]);
  const [noAdmins, setNoAdmins] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        if (data.length > 0) {
          setAdmins(data);
        } else {
          setNoAdmins(true);
        }
      } catch (error) {
        console.error('Error fetching admins:', error);
        setError('Failed to fetch admins. Please try again later.');
      }
    };

    fetchAdmins();
  }, []);

  function logout(){
    
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
        <button onClick={logout()}>Logout</button>
      </div>
      <div className="users-main-content">
      <h2>CHECK USERS</h2>
        {error ? (
          <p>Error: {error}</p>
        ) : noAdmins ? (
          <p>No users found.</p>
        ) : (
          admins.map((admin) => (
            <div key={admin.id} className="user-card">
              <p>Full Name: {admin.fullname}</p>
              <p>Email: {admin.email}</p>
              <p>Registration Time: {admin.regtime}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Checkuadmins;