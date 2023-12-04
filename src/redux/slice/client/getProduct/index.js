import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../../api/api.js";

export const GetProducts = createApi({
    reducerPath: "getProductData",
    baseQuery: api,
    tagTypes: ["Product"],
    endpoints: (build) => ({
        getProduct: build.query({
            query: () => "products",
            providesTags: ["Product"],
        }),
        getProductId: build.query({
            query: (body) => ({
                url: `sciences/${body.ID}`,
                method: "POST",
            }),
            invalidatesTags: ["Product"],
        }),
        updateScience: build.mutation({
            query: (body) => ({
                url: `sciences/${body.id}/`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Product"],
        }),
        createProduct: build.mutation({
            query: (body) => ({
                url: `sciences/${body.id}/`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Product"],
        }),
        deleteScience: build.mutation({
            query: (body) => ({
                url: `sciences/${body.id}/`,
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
    useUpdateScienceMutation,
    useDeleteScienceMutation,
} = GetProducts;
