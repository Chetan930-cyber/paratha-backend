import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import videoSrc from '../assets/1.mp4'; // Import the video file

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo('.heading', { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 1 });
    gsap.fromTo('.subheading', { opacity: 0, x: 100 }, { opacity: 1, x: 0, duration: 1, delay: 0.3 });
    gsap.fromTo('.content', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 1 });
    gsap.fromTo('.cta', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 1.5 });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-yellow-500 via-red-600 to-pink-700 text-white relative overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={videoSrc}
        autoPlay
        loop
        muted
      ></video>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div> {/* Overlay */}

      <motion.h1
        className="heading text-[24px] sm:text-[28px] md:text-4xl lg:text-7xl xl:text-8xl font-bold mb-8 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        🌟 Delicious Paratha Store 🌟
      </motion.h1>

      <motion.h2
        className="subheading text-3xl md:text-4xl lg:text-5xl mb-4 z-10 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 animate-blink"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Taste the Magic!
      </motion.h2>
      
      <motion.div className="content z-10 mt-8 text-center">
        <p className="text-2xl mb-4 font-bold animate-shimmer">
          Home of the best parathas in town!
        </p>
        <p className="text-xl font-bold text-yellow-300">
          From classic plain parathas to gourmet delights, we've got it all.
        </p>
      </motion.div>

      <motion.button
        className="cta relative text-white px-6 py-3 bg-gradient-to-r from-red-600 via-pink-600 to-red-600 font-bold rounded-full shadow-lg z-10 mt-8 hover:bg-gradient-to-r hover:from-green-500 hover:via-blue-500 hover:to-purple-500 transition-all duration-300"
        onClick={() => navigate('/products')}
      >
        Order Now
      </motion.button>

      {/* Footer */}
      <div className="absolute bottom-10 left-0 right-0 text-center text-white z-10">
        <p className="footer-text font-bold">
          Contact us at: +91 7389543500 | Address: 123 Paratha Street, Food City Amritsar (Punjab)
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
