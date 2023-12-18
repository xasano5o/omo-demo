import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../../api/api.js";

export const GetBanner = createApi({
    reducerPath: "getBanner",
    baseQuery: api,
    tagTypes: ["Banner"],
    endpoints: (build) => ({
        GetBanners: build.query({
            query: (body) => `banners/`,
            method:"GET",
            providesTags: ["Banner"],
        }),
        createBanners: build.mutation({
            query: (body) => ({
                url: 'banners/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ["getCategoryt"]
        }),
        updateBanners: build.mutation({
            query: (body) => ({
                url: `banners/${body.id}/`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Banner"],
        }),
        deleteBanners: build.mutation({
            query: (body) => ({
                url: `banners/${body.id}/`,
                method: "DELETE",
                body,
            }),
            invalidatesTags: ["Banner"],
        }),        
    }),
});

export const {
   useDeleteBannersMutation,
   useGetBannersQuery,
   useCreateBannersMutation,
   useUpdateBannersMutation
} = GetBanner;
