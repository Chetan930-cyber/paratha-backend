import React from 'react';
import { useSelector } from 'react-redux';

const ParathaItem = ({ paratha }) => {
  const cart = useSelector((state) => state.cart);
  const existingItem = cart.find(item => item.id === paratha.id);
  const quantity = existingItem ? existingItem.quantity : 0;

  return (
    <div className="border rounded-lg p-4 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="w-full h-64 bg-gray-200 flex items-center justify-center mb-4">
        <img 
          src={paratha.image} 
          alt={paratha.name} 
          className="object-cover h-full w-full rounded-lg" 
        />
      </div>
      <h2 className="text-xl font-bold">{paratha.name}</h2>
      <p className="text-gray-900">₹{paratha.price}</p>
      {quantity > 0 && <span className="ml-2 text-blue-600 font-bold">({quantity})</span>}
    </div>
  );
};

export default ParathaItem;