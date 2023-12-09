import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../../api/api.js";

export const DiscountCrud = createApi({
    reducerPath: "getDiscountData",
    baseQuery: api,
    tagTypes: ["getDataDiscount"],
    endpoints: (build) => ({
        getDiscount: build.query({
            query: (body) => "discounts/",
            providesTags: ["getDataDiscount"],
        }),
        getProductId: build.query({
            query: (body) => ({
                url: `discounts/${body.ID}`,
                method: "POST",
            }),
            invalidatesTags: ["getDataDiscount"],
        }),

        createDiscount: build.mutation({
            query: (body) => ({
                url: 'discounts/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ["getDataDiscount"]
        }),
        updateCategorie: build.mutation({
            query: (body) => ({
                url: `discounts/${body.get("id")}/`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["getDataDiscount"],
        }),

        deleteCategorie: build.mutation({
            query: (body) => ({
                url: `discounts/${body.ID}/`,
                method: "DELETE",
                body,
            }),
            invalidatesTags: ["getDataDiscount"],
        }),
    }),
});

export const {
     useGetDiscountQuery,
     useCreateDiscountMutation,
    useGetProductIdQuery,
    useDeleteCategorieMutation,
    useUpdateCategorieMutation,
} = DiscountCrud;
