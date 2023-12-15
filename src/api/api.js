import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const apiUrl = 'https://omofood.pythonanywhere.com/api/v1/';
export const baseUrl = apiUrl;

axios.defaults.baseURL = baseUrl

export const api = fetchBaseQuery({
    baseUrl,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
    },
});
