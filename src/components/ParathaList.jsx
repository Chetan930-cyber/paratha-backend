import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Confetti from 'react-confetti';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchParathasThunk } from '../slices/parathaSlice';
import { addToCart } from '../slices/cartSlice';
import ParathaItem from './ParathaItem';
import parathaImage from '../assets/2.png';

const ParathaList = () => {
  const dispatch = useDispatch();
  const parathas = useSelector((state) => state.parathas.items);
  const cart = useSelector((state) => state.cart);
  const parathaListRef = useRef(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const titleRef = useRef(null);
  const [windowDimensions, setWindowDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    if (parathas.length === 0) {
      dispatch(fetchParathasThunk());
    }
  }, [dispatch, parathas.length]);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (parathaListRef.current) {
      gsap.from(parathaListRef.current.children, {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
      });
    }

    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { x: '100vw' }, {
        x: 0,
        duration: 1.5,
        ease: 'power3.out',
      });
    }

    const confettiTimeout = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(confettiTimeout);
  }, [parathas]);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (paratha) => {
    dispatch(addToCart(paratha));
  };

  return (
    <div className="container gap-4 mx-auto border border-green-500 border-[3px] py-4 min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=600')" }}>
      {showConfetti && <Confetti width={windowDimensions.width} height={windowDimensions.height} />}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4 mx-auto">
          <img src={parathaImage} alt="Paratha" className="w-24 h-24 object-cover mb-2" />
          <div className="flex justify-center items-center w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 bg-white bg-opacity-50 px-4 py-2 rounded">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
                Paratha Store
              </span>
            </h1>
          </div>
        </div>
        <Link to="/cart" className="relative flex items-center">
          <i className="fa-solid fa-cart-shopping text-white text-3xl bg-black p-2 rounded-full"></i>
          {totalQuantity > 0 && (
            <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              {totalQuantity}
            </span>
          )}
        </Link>
      </div>
      <div ref={parathaListRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {parathas && parathas.length > 0 ? (
          parathas.map((paratha) => (
            <div key={paratha.id} className="p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <ParathaItem paratha={paratha} />
              <button className="gradient-button mt-4 w-full" onClick={() => handleAddToCart(paratha)}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>Loading Parathas...</p>
        )}
      </div>
      <div className="flex justify-center mt-12">
        <Link to="/cart" className="px-6 py-3 my-6 gradient-button-cart text-white rounded-full shadow-lg transition duration-300">
          Go to Cart
        </Link>
      </div>
    </div>
  );
};

export default ParathaList;
