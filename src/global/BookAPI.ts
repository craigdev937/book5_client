import { createApi, 
    fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBook } from "../models/Interfaces";

const URL = "https://book5-restapi.herokuapp.com/api";

export const BookAPI = createApi({
    reducerPath: "BookAPI",
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    tagTypes: ["Books"],
    endpoints: (builder) => ({
        fetchAll: builder.query<IBook[], void>({
            query: () => "/",
        }),
    }),
});





