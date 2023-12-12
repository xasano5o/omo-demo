import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../../api/api.js";

export const  BasketCrud = createApi({
    reducerPath: "getBasket",
    baseQuery: api,
    tagTypes: ["Basket"],
    endpoints: (build) => ({
        getBasket: build.query({
            query: () => ({
                url: `basket/?product=true`,
                method: "GET",
            }),
            providesTags: ["basket"], // Endi bu query "basket" tegi bilan bog'liq ma'lumotlarni ta'minlaydi
        }),

        createBasket: build.mutation({
            query: (body) => ({
                url: `basket/`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["basket"],
        }),
        deleteBasket: build.mutation({
            query: (body) => ({
                url: `categories/${body.id}/`,
                method: "DELETE",
                body,
            }),
            invalidatesTags: ["basket"],
        }),

    }),
});

export const {
    useGetBasketQuery,
     useCreateBasketMutation,
     useDeleteBasketMutation,
} = BasketCrud ;
