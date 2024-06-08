import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import market from '../Assets/market.png';
import './ProductDisplay.css';
import { BASE_URL } from '../../config';


const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);
  const [animationKey, setAnimationKey] = useState(0);
  const [messageVisible, setMessageVisible] = useState(false);

  useEffect(() => {
    setAnimationKey(prevKey => prevKey + 1);
  }, [product]);

  if (!product) return <div>Loading...</div>;

  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const resetQuantity = () => {
    setQuantity(1);
  };

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    resetQuantity();
    setMessageVisible(true);
    setTimeout(() => {
      setMessageVisible(false);
    }, 1500); // Hide the message after 3 seconds
  };

  return (
    <div className={`productdisplay fade-in`} key={animationKey}>
      {messageVisible && <div className="floating-message">Sent to cart!</div>}
      <div className="productdisplay-left">
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={`${BASE_URL}${product.imageURL}`} alt={product.name} />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1><br />
        <p>Brand: {product.brand}</p><br />
        <p>Category: {product.category}</p><br />
        <p>Concentration: {product.concentration}</p><br />
        <p>Description: </p><br />
        <span>{product.description}</span><br />
        <h2>Price: {product.price} DZD</h2>

        <div className="quantity-control">
          <button onClick={handleDecrease}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncrease}>+</button>
        </div>

        <button onClick={handleAddToCart}>
          <img src={market} alt="" style={{ width: "20px" }} /> ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductDisplay;
