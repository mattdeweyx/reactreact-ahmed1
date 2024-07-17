import React, { useContext, useState, useEffect } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';


const CartItems = () => {
  const { cartItems, product,removeFromCart, fetchTotalCartItems } = useContext(ShopContext);
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [cartItemsData, setCartItemsData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // Calculate total price when cartItems or promoCode changes
    const totalPrice = cartItems.items.reduce((acc, currentItem) => acc + currentItem.total, 0);
    setTotalPrice(totalPrice);
  }, [cartItems, promoCode]);

  useEffect(() => {
    // Fetch total cart items when component mounts
    fetchTotalCartItems();
  }, [fetchTotalCartItems]);

  useEffect(() => {
    // Set cart items data from context
    const updatedCartItemsData = cartItems.items.map((item) => ({
      cart_id: item.cart_item_id,
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      imageURL: item.product.imageURL,
      quantity: item.quantity,
      total: item.total,
    }));
    setCartItemsData(updatedCartItemsData);
    // Update the animation key to trigger re-animation
    setAnimationKey(prevKey => prevKey + 1);
  }, [cartItems]);

  const handlePromoCodeSubmit = () => {
    // Handle promo code submission logic
  };

  const handleRemoveFromCart = (cartId) => {
    // Remove item from cart and trigger re-render
    removeFromCart(cartId);
  };

  return (
    <div className={`cartitems fade-in`} key={animationKey}>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Name</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {cartItemsData.map((item) => (
        <div key={item.id}>
          <div className="cartitems-format cartitems-format-main">
            <img src={`${BASE_URL}${item.imageURL}`} alt="" className='carticon-product-icon' />
            <p>{item.name}</p>
            <p>${item.price}</p>
            <button className='cartitems-quantity'>{item.quantity}</button>
            <p>${item.total}</p>
            <img className='cartitems-remove-icon' src={remove_icon} onClick={() => handleRemoveFromCart(item.cart_id)} alt="" />
          </div>
          <hr />
        </div>
      ))}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${totalPrice}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${totalPrice}</h3>
            </div>
          </div>
          <button
            onClick={() => navigate('/CheckoutForm', { state: { cartItems: cartItemsData, total: totalPrice }})}
            disabled={cartItemsData.length === 0}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cartitems-promobox">
            <input
              type="text"
              placeholder='Promo code'
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button onClick={handlePromoCodeSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
