import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/types";
import { State } from '../redux/store';

interface productsState {
  products: [Product] | []
}

const initialState: productsState = {
  products: []
}

const productSlice = createSlice({
  name: 'productsData',
  initialState,
  reducers:{
   loadProducts:(state, action)=>{
      state.products = action.payload.products
   },
  },
})

export const { loadProducts } = productSlice.actions
export default productSlice.reducer

export const selectProducts = (state: State) => state.productsData.products