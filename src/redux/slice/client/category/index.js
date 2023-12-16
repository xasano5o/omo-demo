import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../../api/api.js";

export const CategoryCrud = createApi({
    reducerPath: "getCategorytData",
    baseQuery: api,
    tagTypes: ["getCategoryt"],
    endpoints: (build) => ({
        getCategory: build.query({
            query: (body) => "categories/",
            providesTags: ["getCategoryt"],
        }),
        getProductId: build.query({
            query: (body) => ({
                url: `categories/${body.id}/get_products/`,
                method: "GET",
            }),
            invalidatesTags: ["getCategoryt"],
        }),

        createCategoria: build.mutation({
            query: (body) => ({
                url: 'categories/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ["getCategoryt"]
        }),
        updateCategorie: build.mutation({
            query: (body) => ({
                url: `categories/${body.id}/`,
                method: "PATCH",
                body: body.form_data,
            }),
            invalidatesTags: ["getCategoryt"],
        }),

        deleteCategorie: build.mutation({
            query: (body) => ({
                url: `categories/${body.id}/`,
                method: "DELETE",
                body,
            }),
            invalidatesTags: ["getCategoryt"],
        }),
    }),
});

export const {
    useGetCategoryQuery,
    useGetProductIdQuery,
    useCreateCategoriaMutation,
    useDeleteCategorieMutation,
    useUpdateCategorieMutation,
} = CategoryCrud;
