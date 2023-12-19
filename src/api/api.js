import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const apiUrl = 'https://omofood.pythonanywhere.com/api/v1/';
export const baseUrl = apiUrl;

axios.defaults.baseURL = baseUrl

export const api = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("user");
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
      },
    }



);