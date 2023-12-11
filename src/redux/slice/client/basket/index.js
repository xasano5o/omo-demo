import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../../api/api.js";

export const GetProducts = createApi({
    reducerPath: "getBasket",
    baseQuery: api,
    tagTypes: ["Basket"],
    endpoints: (build) => ({
        getBasket: build.query({
            query: (body) => `basket/`,
            providesTags: ["basket"],
        }),
        getBasketId: build.query({
            query: (body) => ({
                url: `basket/${body.id}/`,
                method: "GET",
            }),
            invalidatesTags: ["basket"],
        }),
        updateProduct: build.mutation({
            query: (body) => ({
                url: `basket/${body.get("id")}/`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Product"],
        }),
        createBasket: build.mutation({
            query: (body) => ({
                url: `basket/`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Product"],
        }),
        deleteProduct: build.mutation({
            query: (body) => ({
                url: `products/${body.id}/`,
                method: "DELETE",
                body,
            }),
            invalidatesTags: ["Product"],
        }),
    }),
});

export const {
    useGetProductQuery,
    useGetProductIdQuery,
    useGetProductCatgoriQuery,
     useCreateBasketMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = GetProducts;
