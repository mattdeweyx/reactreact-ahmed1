import React from 'react';
import checkmarkIcon from '../Assets/checked.png';

const ThankYouPage = () => {
  return (
    <div style={styles.container}>
      <img src={checkmarkIcon} alt="Order Confirmed" style={styles.icon} className="fade-in" />
      <h1 style={styles.heading} className="fade-in delay-1">Thank You</h1>
      <p style={styles.message} className="fade-in delay-2">Your order has been placed.</p>
      <p style={styles.message} className="fade-in delay-3">We will call you for order confirmation.</p>
      <p style={styles.deliveryInfo} className="fade-in delay-4">EXPECTED DELIVERY: After 10 days</p>
      <h3 style={styles.redirect} className="fade-in delay-5">You will be redirected to the home page soon</h3>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
  },
  icon: {
    width: '80px',
    height: 'auto',
    marginBottom: '1rem',
    marginTop: "-10px",
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '1.5rem',
  },
  message: {
    fontSize: '1rem',
    marginBottom: '0.5rem',
    textAlign: 'center',
  },
  deliveryInfo: {
    fontSize: '0.9rem',
    marginTop: '1rem',
    marginBottom: '2rem',
    color: '#555',
  },
  redirect: {
    fontSize: '1.2rem',
    color: '#333',
  },
};

// Add this style block in your CSS file or in a <style> tag in your HTML
const styleTag = document.createElement('style');
styleTag.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .fade-in {
    animation: fadeIn 1s ease-out forwards;
    opacity: 0;
  }

  .delay-1 { animation-delay: 0.2s; }
  .delay-2 { animation-delay: 0.4s; }
  .delay-3 { animation-delay: 0.6s; }
  .delay-4 { animation-delay: 0.8s; }
  .delay-5 { animation-delay: 1s; }
`;
document.head.appendChild(styleTag);

export default ThankYouPage;