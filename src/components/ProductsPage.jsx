import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ParathaList from './ParathaList';
import { motion, AnimatePresence } from 'framer-motion';

const ProductsPage = () => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = ['Our Parathas', 'Delicious Parathas', 'Premium Parathas'];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="container mx-auto py-4 min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(https://cdn.pixabay.com/photo/2013/10/29/18/20/flower-202483_960_720.jpg)' }}
    >
      <div className="flex justify-start mb-6">
        <Link to="/" className="text-white px-4 py-2 bg-blue-600 rounded-full shadow-lg hover:bg-blue-800 transition duration-300">
          Back
        </Link>
      </div>
      <h1 className="text-5xl font-extrabold mb-6 text-center shine-text">
        <AnimatePresence mode='wait'>
          <motion.span
            key={textIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {texts[textIndex]}
          </motion.span>
        </AnimatePresence>
      </h1>
      <ParathaList />
    </div>
  );
};

export default ProductsPage;