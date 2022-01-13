import React from "react";
import { BookAPI } from "../global/BookAPI";
import { Item } from "./Item";

export const List = (): JSX.Element => {
    const { data } = BookAPI.useFetchAllQuery();

    return (
        <React.Fragment>
            <h1>List</h1>
            {data?.map((book) => (
                <main key={book._id}>
                    <h1>{book.title}</h1>
                </main>
            ))}
        </React.Fragment>
    );
};




