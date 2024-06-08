import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = ({ product }) => {
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='item'>
      <Link to={`/product/${product.id}`} onClick={() => window.scrollTo(0, 0)}>
        <img src={product.image} alt="" />
      </Link>
      <p>{product.name}</p>
      <p>{product.brand}</p>
      <p>{product.price}</p>
      <p>{product.category}</p>
    </div>
  );
};

export default Item;
