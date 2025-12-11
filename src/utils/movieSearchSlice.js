// store/movieSearchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  results: [], 
  isLoading: false,
  error: null,
};

const movieSearchSlice = createSlice({
  name: 'movieSearch',
  initialState,
  reducers: {
    searchStarted(state, action) {
      state.query = action.payload;
      state.isLoading = true;
      state.error = null;
    },
    searchSucceeded(state, action) {
      state.isLoading = false;
      state.results = action.payload; 
    },
    searchFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.results = [];
    },
    clearSearch(state) {
      state.query = '';
      state.results = [];
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const {
  searchStarted,
  searchSucceeded,
  searchFailed,
  clearSearch,
} = movieSearchSlice.actions;

export default movieSearchSlice.reducer;
