import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config';
import './SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const { searchResults, searchQuery } = location.state || {};
  const [products, setProducts] = useState(searchResults || []);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchResults && searchQuery) {
      const fetchSearchResults = async () => {
        try {
          const response = await axios.post(`${BASE_URL}api/products/search`, { query: searchQuery });
          if (response.status === 200) {
            setProducts(response.data);
          } else {
            setError('An error occurred while fetching the products.');
          }
        } catch (error) {
          console.error('Error fetching products:', error);
          setError('Failed to connect to the server.');
        }
      };

      fetchSearchResults();
    }
  }, [searchQuery, searchResults]);

  return (
    <div className="search-results-container">
      <div className="new-collections">
        <h1>Product List</h1>
        <hr />
      </div>
      <div className="collections">
        {error && <p>{error}</p>}
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="search-result-item">
              <div className="search-result-image">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="search-result-details">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>{product.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No products found for "{searchQuery}"</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
