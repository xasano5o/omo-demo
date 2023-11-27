import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { GetProducts } from "../slice/client/getProduct/index.js";
import { CategoryCrud } from "../slice/client/category/index.js";



export const store = configureStore({
    reducer: {
        [GetProducts.reducerPath]: GetProducts.reducer,
        [CategoryCrud.reducerPath]: CategoryCrud.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            GetProducts.middleware,
            CategoryCrud.middleware,
        ),
});

setupListeners(store.dispatch);
