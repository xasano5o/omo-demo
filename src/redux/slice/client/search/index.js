import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../../api/api.js";

export const SearchData = createApi({
    reducerPath: "getSearch",
    baseQuery: api,
    tagTypes: ["getSubCategoryt"],
    endpoints: (build) => ({
        getSearch: build.query({
            query: (search) => `search/?query=${search}`,
            providesTags: ["getSubCategoryt"],
        }),
    }),
});

export const {
    useGetSearchQuery,
} = SearchData;
