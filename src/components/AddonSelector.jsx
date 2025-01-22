import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addAddon } from '../slices/cartSlice';
import { fetchAddons } from '../services/api';

const AddonSelector = ({ paratha }) => {
  const [availableAddons, setAvailableAddons] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const addons = await fetchAddons();
      setAvailableAddons(addons);
    };
    fetchData();
  }, []);

  const handleAddonChange = (addonName, checked) => {
    const selectedAddons = paratha.addons || [];
    if (checked) {
      dispatch(addAddon({ id: paratha.id, addons: [...selectedAddons, addonName] }));
    } else {
      dispatch(addAddon({ id: paratha.id, addons: selectedAddons.filter(addon => addon !== addonName) }));
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2 text-purple-800">Add-ons</h3>
      <div className="grid grid-cols-1 gap-2">
        {availableAddons.map((addon) => (
          <label 
            key={addon.name} 
            className="flex items-center space-x-2 p-2 rounded-lg bg-orange-200 shadow-md hover:bg-orange-300 transition duration-300"
          >
            <input 
              type="checkbox" 
              checked={paratha.addons?.includes(addon.name) || false}
              onChange={(e) => handleAddonChange(addon.name, e.target.checked)}
              className="form-checkbox h-5 w-5 text-pink-500" 
            />
            <span className="text-gray-800 font-bold">{addon.name} (+₹{addon.price})</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default AddonSelector;