import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/types";
import { State } from '../redux/store';

interface productsState {
  products: [Product] | []
  currentProduct: Product
  isEditing: Boolean
}

const initialState: productsState = {
  products: [],
  currentProduct: {
    img: "",
    name: "",
    description: "",
    price: 0,
    _id: "",
  },
  isEditing: false
}

const productSlice = createSlice({
  name: 'productsData',
  initialState,
  reducers:{
   loadProducts:(state, action)=>{
      state.products = action.payload.products
   },
   loadProductToEdit: (state, action) => {
    state.currentProduct = {
      img: action.payload.img,
      name: action.payload.name,
      description: action.payload.description,
      price: action.payload.price,
      _id: action.payload._id
    }
    state.isEditing = action.payload.set
  },
  },
})

export const { loadProducts, loadProductToEdit } = productSlice.actions
export default productSlice.reducer

export const selectProducts = (state: State) => state.productsData.products
export const selectCurrentProduct = (state: State) => state.productsData.currentProduct
export const selectIsEditing = (state: State) => state.productsData.isEditing