import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../../api/api.js";

export const OrderCrud = createApi({
    reducerPath: "getOrdertData",
    baseQuery: api,
    tagTypes: ["Order"],
    endpoints: (build) => ({
        getCategory: build.query({
            query: (body) => "orders/checkout/",
            providesTags: ["Order"],
        }),

        orderCreate: build.mutation({
            query: (body) => ({
                url: 'orders/checkout/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ["Order"]
        }),
        updateCategorie: build.mutation({
            query: (body) => ({
                url: `categories/${body.get("id")}/`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Order"],
        }),

        deleteCategorie: build.mutation({
            query: (body) => ({
                url: `categories/${body.ID}/`,
                method: "DELETE",
                body,
            }),
            invalidatesTags: ["Order"],
        }),
    }),
});

export const {
    useGetCategoryQuery,
    useOrderCreateMutation,
    useDeleteCategorieMutation,
    useUpdateCategorieMutation,
} = OrderCrud;
