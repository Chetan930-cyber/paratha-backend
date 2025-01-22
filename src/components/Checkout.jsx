import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDeliveryCharges, fetchAddons } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import BackButton from './BackButton';
import { clearCart } from '../slices/cartSlice';

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [deliveryCharges, setDeliveryCharges] = useState([]);
  const [availableAddons, setAvailableAddons] = useState([]);
  const [selectedRange, setSelectedRange] = useState('');
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // Fetch delivery charges and addons when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const deliveryData = await fetchDeliveryCharges();
      setDeliveryCharges(deliveryData);
      const addonsData = await fetchAddons();
      setAvailableAddons(addonsData);
    };
    fetchData();
  }, []);

  // Calculate the total amount whenever the cart, delivery charges, selected range, or available addons change
  useEffect(() => {
    const calculateTotal = () => {
      const itemsTotal = cart.reduce((sum, item) => {
        // Calculate the total price of addons for each item
        const addonPrices = item.addons?.reduce((addonSum, addon) => {
          const addonData = availableAddons.find(a => a.name === addon);
          return addonSum + (addonData ? addonData.price : 0);
        }, 0) || 0;
        // Calculate the total price of the item including addons
        return sum + (item.price + addonPrices) * item.quantity;
      }, 0);

      // Find the selected delivery charge and ensure it's a number
      const deliveryCharge = Number(deliveryCharges.find(charge => charge.range === selectedRange)?.price) || 0;
      // Calculate the total amount including the delivery charge
      setTotal(itemsTotal + deliveryCharge);
    };

    calculateTotal();
  }, [cart, deliveryCharges, selectedRange, availableAddons]);

  // Handle placing the order
  const handlePlaceOrder = () => {
    const orderDetails = {
      cart,
      total: Number(total).toFixed(2),
    };
    dispatch(clearCart());
    navigate('/order-confirmation', { state: { orderDetails } });
  };

  // Animations for the checkout page
  useEffect(() => {
    gsap.fromTo(".checkout-container", { opacity: 0 }, { opacity: 1, duration: 1 });
    gsap.fromTo(".checkout-content", { x: "-100%" }, { x: "0%", duration: 1, stagger: 0.2 });
    gsap.fromTo(".checkout-item", { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, duration: 1, stagger: 0.2 });
  }, []);

  return (
    <div className="container mx-auto py-4 min-h-screen bg-checkout checkout-container">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center gradient-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Checkout
      </motion.h1>
      <motion.div
        className="mb-6 bg-white p-4 rounded-lg shadow-md hover-border checkout-content"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 50, damping: 10, delay: 0.2 }}
      >
        <label htmlFor="delivery-range" className="block text-gray-700 text-lg font-semibold">Select Delivery Range:</label>
        <select
          id="delivery-range"
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
          className="mt-2 px-4 py-2 border rounded w-full"
        >
          <option value="">Select Distance</option>
          {deliveryCharges.map((charge) => (
            <option key={charge.range} value={charge.range}>{charge.range} - ₹{charge.price}</option>
          ))}
        </select>
      </motion.div>
      <motion.h2
        className="text-2xl font-extrabold mb-4 text-yellow-400 bg-green-800 p-2 rounded"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        Order Details:
      </motion.h2>
      <motion.ul
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        {cart.map((item) => (
          <li key={item.id} className="flex items-center bg-white p-4 rounded-lg shadow-md hover-border checkout-item">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg mr-4" />
            <div className="flex-1">
              <div className="text-lg font-bold">{item.name}</div>
              <div className="text-gray-700">x {item.quantity} - ₹{(item.price * item.quantity).toFixed(2)}</div>
              {item.addons && item.addons.length > 0 && (
                <ul className="mt-2 text-red-600 font-extrabold">
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
      </motion.ul>
      <motion.div
        className="mt-6 p-4 bg-white rounded-lg shadow-md hover-border checkout-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <p className="text-xl font-bold text-gray-800 text-center">Total: ₹{Number(total).toFixed(2)}</p>
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-lg hover:shadow-xl transition duration-300"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </motion.div>
      <div className="mt-6">
        <BackButton
          className="inline-block text-white rounded gradient-button-back-home"
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
          }}
        />
      </div>
    </div>
  );
};

export default Checkout;
