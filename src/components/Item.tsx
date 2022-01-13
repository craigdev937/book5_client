import React from "react";
import { Link } from "react-router-dom";
import { IBook } from "../models/Interfaces";

type Props = {
    book: IBook
};

export const Item = ({book}: Props): JSX.Element => {
    return (
        <React.Fragment>
            <h2><Link 
                to={`/books/edit/${book._id}`}
                    >{book.title}
                </Link>
            </h2>
            <main key={book._id}>
                <p>{book.first} {book.last}</p>
                <p>Age: {book.age}</p>
                <p>Info: {book.info}</p>
            </main>
        </React.Fragment>
    );
};




