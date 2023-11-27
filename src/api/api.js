import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiUrl = 'https://omofood.pythonanywhere.com/api/v1/';
export const baseUrl = apiUrl;


export const api = fetchBaseQuery({
    baseUrl,
    headers: {
        // Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
});
