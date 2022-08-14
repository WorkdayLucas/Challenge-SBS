import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../slices/productSlice";
import { productsApi } from "../slices/ApiScile/apiSlice";


export const store = configureStore({
    reducer: {
        productsData: productSlice,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware(),
    devTools: true
})


export type State = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
