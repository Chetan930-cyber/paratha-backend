import { configureStore } from '@reduxjs/toolkit';
import parathaReducer from './slices/parathaSlice';
import cartReducer from './slices/cartSlice';

const store = configureStore({
  reducer: {
    parathas: parathaReducer,
    cart: cartReducer,
  },
});

export default store;
