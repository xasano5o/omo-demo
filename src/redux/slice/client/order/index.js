import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../../api/api.js";

export const GetOrder = createApi({
    reducerPath: "getOrder",
    baseQuery: api,
    tagTypes: ["Order"],
    endpoints: (build) => ({
        getOrder: build.query({
            query: (body) => `orders/`,
            providesTags: ["Order"],
        }),
        updateOrder: build.mutation({
            query: (body) => ({
                url: `orders/${body.id}/`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Order"],
        }),
        deleteOrders: build.mutation({
            query: (body) => ({
                url: `orders/${body.id}/`,
                method: "DELETE",
                body,
            }),
            invalidatesTags: ["Order"],
        }),
    }),
});

export const {
    useDeleteOrdersMutation,
    useGetOrderQuery,
    useUpdateOrderMutation,
} = GetOrder;
