import axios from 'axios';
import API_URL from './config'; // Import the API URL from the configuration file

// Fetch parathas from backend
export const fetchParathas = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/parathas`);
    return response.data;
  } catch (error) {
    console.error('Error fetching parathas:', error);
    return [];
  }
};

// Fetch addons from backend
export const fetchAddons = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/addons`);
    return response.data;
  } catch (error) {
    console.error('Error fetching addons:', error);
    return [];
  }
};

// Fetch delivery charges from backend
export const fetchDeliveryCharges = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/deliveryCharges`);
    return response.data;
  } catch (error) {
    console.error('Error fetching delivery charges:', error);
    return [];
  }
};