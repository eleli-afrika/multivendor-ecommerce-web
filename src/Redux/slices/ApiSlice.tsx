import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("userToken");
    if (token) headers.set("Authorization", `Bearer ${token}`);

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["User"],
  endpoints: () => ({}),
});
