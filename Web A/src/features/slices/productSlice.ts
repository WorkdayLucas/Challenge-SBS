import { createSlice } from "@reduxjs/toolkit";
import { Product, ProductInput } from "../../types/types";
import { State } from '../redux/store';

interface productsState {
  products: [Product] | []
  currentProduct: Product
  GetProductsInput: ProductInput
  resetPage: boolean
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
  },
  GetProductsInput: {
    name: "",
    limit: 6,
    skip: 0,
  },
  resetPage: false
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
    setProductsInput: (state, action) => {
      state.GetProductsInput = {
        name: action.payload.name,
        limit: action.payload.limit,
        skip: action.payload.skip,
      }
    },
    activateResetPage: (state, action)=>{
      state.resetPage = !state.resetPage
    }
  },
})

export const { loadProducts, loadCurrentProduct, setProductsInput, activateResetPage} = productSlice.actions
export default productSlice.reducer

export const selectProducts = (state: State) => state.productsData.products
export const selectCurrentProduct = (state: State) => state.productsData.currentProduct
export const selectProductsInput = (state: State) => state.productsData.GetProductsInput
export const selectResetPage = (state: State) => state.productsData.resetPage
