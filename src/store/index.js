import {configureStore} from "@reduxjs/toolkit";
import productsSlice from "./slices/productsSlice";
import popUpSlice from "./slices/popUpSlice";

const store = configureStore({
  reducer: {
    products: productsSlice,
    popUp: popUpSlice,
  }
})

export default store;