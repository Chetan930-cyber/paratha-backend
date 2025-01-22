import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { fetchAddons } from '../services/api';
import Confetti from 'react-confetti';
import { gsap } from 'gsap';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDetails } = location.state || {};
  const [availableAddons, setAvailableAddons] = useState([]);
  const [windowDimensions, setWindowDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [confettiPieces, setConfettiPieces] = useState(200);

  useEffect(() => {
    fetchAddons().then(setAvailableAddons);
  }, []);

  // Redirect to home if orderDetails is missing or cart is empty
  useEffect(() => {
    if (!orderDetails || orderDetails.cart.length === 0) {
      navigate('/');
    }
  }, [orderDetails, navigate]);

  // Update window dimensions for Confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Increase confetti pieces for a burst effect when the page loads
  useEffect(() => {
    setConfettiPieces(500);
    const timer = setTimeout(() => setConfettiPieces(200), 3000); // Reduce after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  // Animations with GSAP
  useEffect(() => {
    gsap.from(".back-home-button", { duration: 1, opacity: 0, x: -50 });
    gsap.from(".premium-title", { duration: 1, opacity: 0, x: -100, delay: 0.5 });
    gsap.from(".premium-subtitle", { duration: 1, opacity: 0, x: 100, delay: 1 });
    gsap.from(".premium-item", { duration: 1, opacity: 0, y: 100, stagger: 0.2, delay: 1.5 });
    gsap.from(".premium-total", { duration: 1, opacity: 0, scale: 0.5, delay: 2 });
    gsap.from(".premium-button", { duration: 1, opacity: 0, y: -50, delay: 2.5 });
  }, []);

  if (!orderDetails) {
    return (
      <div className="container mx-auto py-4 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Order Confirmation</h1>
        <p className="text-gray-700 mb-4">No order details found.</p>
        <Link to="/" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">Back to Home</Link>
      </div>
    );
  }

  const calculateTotalPrice = (item) => {
    const addonPrices = item.addons?.reduce((sum, addon) => {
      const addonData = availableAddons.find(a => a.name === addon);
      return sum + (addonData ? addonData.price : 0);
    }, 0) || 0;
    return (item.price + addonPrices) * item.quantity;
  };

  const total = orderDetails.cart.reduce((sum, item) => sum + calculateTotalPrice(item), 0);

  return (
    <div className="container mx-auto py-4 min-h-screen bg-checkout relative">
      <Confetti
        width={windowDimensions.width}
        height={windowDimensions.height}
        numberOfPieces={confettiPieces}
        gravity={0.3}
      />
      <div className="flex justify-start mb-6">
        <Link to="/" className="back-home-button inline-block px-3 py-1 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded hover:from-orange-500 hover:to-orange-700 transition duration-300">Back to Home</Link>
      </div>
      <div className="premium-container">
        <h1 className="premium-title">Thank You for Your Order!</h1>
        <p className="premium-subtitle text-gradient-fill">Your order has been successfully placed. Here are the details of your order:</p>
        {orderDetails.cart.length > 0 ? (
          <ul className='text-red-600 font-extrabold'>
            {orderDetails.cart.map((item) => (
              <li key={item.id} className="premium-item">
                <img src={item.image} alt={item.name} className="w-32 h-32 object-cover shadow-lg rounded-lg" />
                <div className="premium-item-details">
                  <div className="premium-item-name">{item.name} x {item.quantity}</div>
                  <div className="premium-item-price font-bold text-red-600">₹{(item.price * item.quantity).toFixed(2)}</div>
                  {item.addons && item.addons.length > 0 && (
                    <ul>
                      {item.addons.map((addon, index) => {
                        const addonData = availableAddons.find(a => a.name === addon);
                        return addonData ? (
                          <li key={index} className="ml-4">+ {addon} - ₹{(addonData.price * item.quantity).toFixed(2)}</li>
                        ) : null;
                      })}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
        <p className="premium-total text-red-600 text-left"><strong>Total: ₹{orderDetails.total}</strong></p>
        <Link to="/" className="premium-button gradient-button">Back to Home</Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;