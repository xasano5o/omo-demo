import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../../api/api.js";

export const CategoryCrud = createApi({
    reducerPath: "getCategorytData",
    baseQuery: api,
    tagTypes: ["getCategoryt"],
    endpoints: (build) => ({
        getCategory: build.query({
            query: () => "categories/",
            providesTags: ["getCategoryt"],
        }),
        getProductId: build.query({
            query: (body) => ({
                url: `sciences/${body.ID}`,
                method: "POST",
            }),
            invalidatesTags: ["getCategoryt"],
        }),
        updateScience: build.mutation({
            query: (body) => ({
                url: `sciences/${body.id}/`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["getCategoryt"],
        }),
        deleteScience: build.mutation({
            query: (body) => ({
                url: `sciences/${body.id}/`,
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
    useUpdateScienceMutation,
    useDeleteScienceMutation,
} = CategoryCrud;
