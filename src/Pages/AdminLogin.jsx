import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './CSS/LoginSignup.css';
import emailicon from '../Components/Assets/email-icon.png';
import passwordicon from '../Components/Assets/password-icon.png';
import { BASE_URL} from '../config';


const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 3000); // Hide after 3 seconds

      return () => clearTimeout(timer); // Cleanup the timeout on component unmount
    }
  }, [success, error]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}api/adminLogin`, {
        email,
        password,
      });

      if (response.status === 200) {
        const userData = response.data;
        console.log('Login successful:', userData);

        Cookies.set('auth_token', userData.token);
        Cookies.set('role', userData.role);
        setSuccess('Logged In Successfully!');
        setError('');

        // Redirect immediately
        window.location.href = '/';
      } else {
        setError(response.data.message || 'Login failed');
        console.error('Login failed:', response.data);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Login failed');
        console.error('Login failed:', error.response.data);
      } else {
        setError('Login failed: Network error');
        console.error('Login failed:', error);
      }
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <form onSubmit={handleLogin}>
          <h1>Admin Panel</h1>
          <div className="loginsignup-fields">
            <img src={emailicon} alt="Email Icon" className="icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              required
              autoFocus
            />
          </div>
          <div className="loginsignup-fields">
            <img src={passwordicon} alt="Password Icon" className="icon" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      {error && <div className="message error">{error}</div>}
      {success && <div className="message success">{success}</div>}
    </div>
  );
};

export default AdminLogin;
