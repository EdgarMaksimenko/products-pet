import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  productsData: [],
  isLoading: true,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action){
      state.productsData = action.payload;
      state.isLoading = false;
    }
  },
});

export const { setProducts } = productsSlice.actions
export default productsSlice.reducer;