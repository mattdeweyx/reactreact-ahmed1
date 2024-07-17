import React, { useState, useEffect } from 'react';
import './Userdashboard.css';
import Logout from '../Logout/Logout';
import axios from 'axios';
import { BASE_URL, getBearerTokenFromCookies } from '../../config';

const Userdashboard = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
  });

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedInfo, setUpdatedInfo] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = getBearerTokenFromCookies();
      if (!token) {
        // Handle case where user is not logged in
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}api/user`, {
          headers: {
            Authorization: token,
          },
        });
        if (response.status === 200) {
          setUserInfo(response.data);
          setUpdatedInfo(response.data);
        } else {
          console.error('Failed to fetch user info:', response.data);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleUpdateClick = () => {
    setShowUpdateForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getBearerTokenFromCookies();

    try {
      const response = await axios.put(`${BASE_URL}api/user`, updatedInfo, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 200) {
        setUserInfo(updatedInfo);
        setShowUpdateForm(false);
      } else {
        console.error('Failed to update user info:', response.data);
      }
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  return (
    <div className="userdashboard-container">
      <div className="userdashboard-sidebar">
        <h2><a href="/Userdashboard">Dashboard</a></h2>
        <ul>
          <li>
            <a href="/Myorders">My Orders</a>
          </li>
        </ul>
        <Logout />
      </div>
      <div className="userdashboard-main-content">
        <br />
        <h2>Hello There!</h2><br />
        <div className="userdashbcontainers">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="name"
            value={userInfo.name}
            readOnly
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={userInfo.email}
            readOnly
          />
          <br /><br />
          <button className="update-button" onClick={handleUpdateClick}>Update Info</button>
        </div>
      </div>

      {showUpdateForm && (
        <div className="update-form-overlay">
          <div className="update-form">
            <h3>Update Your Information</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="updateName">Username</label>
              <input
                type="text"
                id="updateName"
                name="name"
                value={updatedInfo.name}
                onChange={handleInputChange}
              />
              <label htmlFor="updateEmail">Email</label>
              <input
                type="email"
                id="updateEmail"
                name="email"
                value={updatedInfo.email}
                onChange={handleInputChange}
              />
              <div className="form-actions">
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setShowUpdateForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Userdashboard;