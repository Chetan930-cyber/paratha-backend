import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchParathas } from '../services/api';

const PARATHAS_KEY = 'parathas';

// Fetch parathas from backend
export const fetchParathasThunk = createAsyncThunk('parathas/fetch', async () => {
  const data = await fetchParathas();
  return data;
});

const parathaSlice = createSlice({
  name: 'parathas',
  initialState: {
    items: JSON.parse(localStorage.getItem(PARATHAS_KEY)) || [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParathasThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchParathasThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        localStorage.setItem(PARATHAS_KEY, JSON.stringify(state.items));
      })
      .addCase(fetchParathasThunk.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default parathaSlice.reducer;