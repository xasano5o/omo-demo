import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../../api/api.js";

export const dasjboardCrud = createApi({
  reducerPath: "getdasjboardtData",
  baseQuery: api,
  tagTypes: ["dasjboard"],
  endpoints: (build) => ({
    getdasjboard: build.query({
      query: (body) =>
        "",
      method: "OPTIONS",
      providesTags: ["dasjboard"],
    }),

    dasjboardCreate: build.mutation({
      query: (body) => ({
        url: "dasjboards/checkout/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["dasjboard"],
    }),
    updatedasjboard: build.mutation({
      query: (body) => ({
        url: `dasjboards/${body.get("id")}/change_delivery_status/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["dasjboard"],
    }),
    deletedasjboard: build.mutation({
      query: (body) => ({
        url: `dasjboards/${body.id}/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["dasjboard"],
    }),
  }),
});

export const {
  useDasjboardCreateMutation,
  useGetdasjboardQuery,
  useLazyGetdasjboardQuery,
  useUpdatedasjboardMutation,
} = dasjboardCrud;
