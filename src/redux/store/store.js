import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { GetUserToekn } from "../slice/client/auth/useGetToken.js";
import { BasketCrud } from "../slice/client/basket/index.js";
import { CategoryCrud } from "../slice/client/category/index.js";
import { DiscountCrud } from "../slice/client/discount/index.js";
import { GetProducts } from "../slice/client/getProduct/index.js";
import { GetOrder } from "../slice/client/order/index.js";
import { SubCategoryCrud } from "../slice/client/subcategory/index.jsx";
import { GetBanner } from "../slice/client/banner/index.js";


export const store = configureStore({
    reducer: {
        [GetBanner.reducerPath]: GetBanner.reducer,
        [GetOrder.reducerPath]: GetOrder.reducer,
        [GetProducts.reducerPath]: GetProducts.reducer,
        [CategoryCrud.reducerPath]: CategoryCrud.reducer,
        [SubCategoryCrud.reducerPath]: SubCategoryCrud.reducer,
        [DiscountCrud.reducerPath]: DiscountCrud.reducer,
        [GetUserToekn.reducerPath]: GetUserToekn.reducer,
        [BasketCrud.reducerPath]: BasketCrud.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            GetOrder.middleware,
            GetProducts.middleware,
            CategoryCrud.middleware,
            SubCategoryCrud.middleware,
            DiscountCrud.middleware,
            GetUserToekn.middleware,
            BasketCrud.middleware,
            GetBanner.middleware
        ),
});

setupListeners(store.dispatch);
