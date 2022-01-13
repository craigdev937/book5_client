import React from "react";
import { Link } from "react-router-dom";
import { BookAPI } from "../global/BookAPI";
import { Item } from "./Item";

export const List = (): JSX.Element => {
    const { data } = BookAPI.useFetchAllQuery();

    return (
        <React.Fragment>
            <button>
                <Link to="/books/add">New Book</Link>
            </button>
            {data?.map((book) => (
                <Item key={book._id} book={book} />
            ))}
        </React.Fragment>
    );
};




