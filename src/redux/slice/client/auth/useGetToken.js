import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../../api/api.js";

export const GetUserToekn= createApi({
    reducerPath: "getUserTokenData",
    baseQuery: api,
    tagTypes: ["getToken"],
    endpoints: (build) => ({
        getUserToken: build.query({
            query: (body) => `users/get_token/`,
            providesTags: ["getToken"],
        }),

        tokenChecUser: build.mutation({
            query: (body) => ({
                url: `users/check_token/`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["getToken"],
        }),
    }),
});

export const {
    useGetProductQuery,
    useGetProductIdQuery,
      useTokenChecUserMutation,
      useGetUserTokenQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = GetUserToekn;
