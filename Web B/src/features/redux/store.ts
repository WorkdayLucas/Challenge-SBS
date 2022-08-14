import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../slices/productSlice";


export const store = configureStore({
    reducer: {
        productsData: productSlice,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware(),
    devTools: true
})


export type State = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
