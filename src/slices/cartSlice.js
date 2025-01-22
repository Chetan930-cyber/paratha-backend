import { createSlice } from '@reduxjs/toolkit';

const CART_KEY = 'cart';

const cartSlice = createSlice({
  name: 'cart',
  initialState: JSON.parse(localStorage.getItem(CART_KEY)) || [],
  reducers: {
    addToCart: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem(CART_KEY, JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index >= 0) state.splice(index, 1);
      localStorage.setItem(CART_KEY, JSON.stringify(state));
    },
    incrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
        localStorage.setItem(CART_KEY, JSON.stringify(state));
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem(CART_KEY, JSON.stringify(state));
      }
    },
    addAddon: (state, action) => {
      const { id, addons } = action.payload;
      const item = state.find((item) => item.id === id);
      if (item) {
        item.addons = addons;
        localStorage.setItem(CART_KEY, JSON.stringify(state));
      }
    },
    clearCart: (state) => {
      state.length = 0;
      localStorage.setItem(CART_KEY, JSON.stringify(state));
    }
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, addAddon, clearCart } = cartSlice.actions;
export default cartSlice.reducer;