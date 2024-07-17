import { useLocation, useNavigate } from 'react-router-dom';
import './CheckoutForm.css';
import { BASE_URL, getBearerTokenFromCookies } from '../../config';
import React, { useContext, useRef, useState, useEffect } from 'react';
import { ShopContext } from '../../Context/ShopContext';
const CheckoutForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [] } = location.state || {};

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const { clearCart, fetchTotalCartItems } = useContext(ShopContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const formData = {
          first_name: firstName,
          last_name: lastName,
          email: email,
          address: address,
          city: city,
          zip_code: zipCode,
          country: country,
          phone: phone,
        };
        
        
        const token = getBearerTokenFromCookies();
        if (!token) {
            console.error('Bearer token not found in cookies');
            return;
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify(formData),
        };
        const response = await fetch(`${BASE_URL}api/order`, options);

        if (response.ok) {
          fetchTotalCartItems();
            clearCart();
            navigate('/ThankYouPage');
        } else {
            console.error('Error submitting form');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
    }
};

  return (
    <div className="checkout-container-main">
      <div className="checkout-form-main">
        <form onSubmit={handleSubmit}>
          <h2 className="checkout-form-heading">Checkout Information :</h2>
          <div className="input-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="zipCode">ZIP Code:</label>
            <input
              type="text"
              id="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="number"
              id="phonr"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="checkout-form-button1">Order</button>
        </form>
      </div>
      <div className="cart-items-summary-main">
        <h2 className="cart-items-heading">Cart Items</h2>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item-main">
              <p>{item.name}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${item.total}</p>
            </div>
          ))
        ) : (
          <p>No items in the cart.</p>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;