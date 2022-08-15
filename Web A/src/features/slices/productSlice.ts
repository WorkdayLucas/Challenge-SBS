import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/types";
import { State } from '../redux/store';

interface productsState {
  products: [Product] | []
  currentProduct: Product
}

const initialState: productsState = {
  products: [],
  currentProduct: {
    img: "",
    name: "",
    description: "",
    price: 0,
    _id: "",
    key: 0,
  }
}

const productSlice = createSlice({
  name: 'productsData',
  initialState,
  reducers: {
    loadProducts: (state, action) => {
      state.products = action.payload.products
    },
    loadCurrentProduct: (state, action) => {
      state.currentProduct = {
        img: action.payload.img,
        name: action.payload.name,
        description: action.payload.description,
        price: action.payload.price,
        _id: action.payload._id,
        key: action.payload.key,
      }
    },
  },
})

export const { loadProducts, loadCurrentProduct} = productSlice.actions
export default productSlice.reducer

export const selectProducts = (state: State) => state.productsData.products
export const selectCurrentProduct = (state: State) => state.productsData.currentProduct