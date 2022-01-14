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
            providesTags: (result) => result ?
            [...result.map(({ _id }) => 
                ({ type: "Books" as const, _id })),
                { type: "Books", id: "LIST" },
            ] : [{ type: "Books", id: "LIST" }],
        }),
        getOne: builder.query({
            query: () => "",
            providesTags: (result, error, _id) =>
            [{ type: "Books", _id }],
        }),
        create: builder.mutation<IBook, IBook>({
            query: (book) => {
                return {
                    url: `/`,
                    method: "POST",
                    body: book
                }
            },
            invalidatesTags: [{ type: "Books", id: "LIST" }],
        }),
        update: builder.mutation<IBook, IBook>({
            query: ({_id, ...book}) => ({
                url: `${_id}`,
                method: "PUT",
                body: book,
            }),
            invalidatesTags: [{ type: "Books", id: "LIST" }],
        }),
        delete: builder.mutation<IBook, string>({
            query: (_id) => ({
                url: `${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "Books", id: "LIST" }],
        }),
    }),
});





