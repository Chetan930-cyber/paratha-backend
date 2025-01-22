import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../slices/cartSlice';
import AddonSelector from './AddonSelector';
import { Link } from 'react-router-dom';
import BackButton from './BackButton';
import { fetchAddons } from '../services/api';

const backgroundImageUrl = 'https://img.freepik.com/free-photo/top-view-paper-spring-flowers-with-copy-space_23-2148413740.jpg?t=st=1737208243~exp=1737211843~hmac=60dc87992a0c35bf64a33ed262ad133c6e865e90e64e18f4fb4d6cb6ea980800&w=1380';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [availableAddons, setAvailableAddons] = useState([]);

  useEffect(() => {
    fetchAddons().then(setAvailableAddons);
  }, []);

  useEffect(() => {
    gsap.fromTo('.cart-container', 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  const calculateTotalPrice = (item) => {
    const addonPrices = item.addons?.reduce((sum, addon) => {
      const addonData = availableAddons.find(a => a.name === addon);
      return sum + (addonData ? addonData.price : 0);
    }, 0) || 0;
    return (item.price + addonPrices) * item.quantity;
  };

  const total = cart.reduce((sum, item) => sum + calculateTotalPrice(item), 0);

  return (
    <div
      className="container mx-auto py-4 bg-gray-100 min-h-screen cart-container"
      style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="flex items-center justify-between mb-6">
        <BackButton className="gradient-button" />
        <motion.h1
          className="text-4xl font-bold text-gray-800 text-center shine-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.05 }}
          style={{
            backgroundImage: 'linear-gradient(45deg, #ff6b6b, #ffd93d, #6bcb77, #4d96ff, #9c1de7)',
            backgroundSize: '200% auto',
            color: 'transparent',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            animation: 'shine 5s linear infinite'
          }}
        >
          Cart
        </motion.h1>
        <div className="w-12"></div>
      </div>

      {cart && cart.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cart.map((item) => (
            <motion.div
              key={item.id}
              className="border-2 border-blue-500 rounded-lg p-3 mb-4 bg-white shadow-md flex flex-col hover:shadow-lg transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="relative w-full h-48 bg-gray-200 rounded-lg mb-3 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover rounded-lg"
                />
                <span className="absolute bottom-1 left-0 bg-yellow border-red-600 text-xs p-1 rounded-tr-lg rounded-bl-lg">
                  {item.name}
                  <span className="green-mark"></span>
                </span>
              </div>
              
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gradient">{item.name}</h2>
                <p className="text-gray-700">₹{item.price}</p>
                
                <div className="flex items-center mt-2">
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
                    onClick={() => dispatch(decrementQuantity(item))}
                  >
                    -
                  </button>
                  <p className="mx-2">{item.quantity}</p>
                  <button
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300"
                    onClick={() => dispatch(incrementQuantity(item))}
                  >
                    +
                  </button>
                </div>
                
                <AddonSelector paratha={item} />
              </div>
              
              <button
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
                onClick={() => dispatch(removeFromCart(item))}
              >
                Remove
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="text-2xl font-bold shine-text">No items in the cart</p>
        </motion.div>
      )}

      <div className="mt-4 text-gray-800 text-center">
        <p className="text-xl font-bold text-purple-800">
          Grand Total: ₹{Number(total).toFixed(2)}
        </p>
        <Link
          to="/checkout"
          className="gradient-button-cart mt-4 inline-block"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;