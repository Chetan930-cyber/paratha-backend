import axios from 'axios';

// Fetch parathas from backend
export const fetchParathas = async () => {
  try {
    const response = await axios.get('/api/parathas');
    return response.data;
  } catch (error) {
    console.error('Error fetching parathas:', error);
    return [];
  }
};

// Fetch addons from backend
export const fetchAddons = async () => {
  try {
    const response = await axios.get('/api/addons');
    return response.data;
  } catch (error) {
    console.error('Error fetching addons:', error);
    return [];
  }
};

// Fetch delivery charges from backend
export const fetchDeliveryCharges = async () => {
  try {
    const response = await axios.get('/api/deliveryCharges');
    return response.data;
  } catch (error) {
    console.error('Error fetching delivery charges:', error);
    return [];
  }
};