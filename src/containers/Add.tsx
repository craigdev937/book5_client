import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookAPI } from "../global/BookAPI";
import { IBook } from "../models/Interfaces";

export const Add = (): JSX.Element => {
    const navigate = useNavigate();
    const [book, setBook] = 
        React.useState({} as IBook);
    const [addBook, 
        { isLoading: updating, isSuccess: saved }] = 
        BookAPI.useCreateMutation();

    const handleChange = 
    (event: React.ChangeEvent<HTMLInputElement>) => {
        setBook({...book, 
            [event.target.name]: event.target.value});
    };

    const handleSubmit =
    async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await addBook(book);
        setBook({
            title: "", first: "", last: "", 
            age: 0, info: ""
        });
        navigate("/");
    };

    return (
        <React.Fragment>
            <h1>Write a new Book</h1>
            <form onSubmit={handleSubmit}>
                <aside>
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        name="title"
                        placeholder="Title"
                        value={book.title}
                        onChange={handleChange}
                    />
                </aside>
                <aside>
                    <label htmlFor="first">First</label>
                    <input 
                        type="text" 
                        name="first"
                        placeholder="First Name"
                        value={book.first}
                        onChange={handleChange}
                    />
                </aside>
                <aside>
                    <label htmlFor="last">Last</label>
                    <input 
                        type="text" 
                        name="last"
                        placeholder="Last Name"
                        value={book.last}
                        onChange={handleChange}
                    />
                </aside>
                <aside>
                    <label htmlFor="age">Age</label>
                    <input 
                        type="number" 
                        name="age"
                        placeholder="Age"
                        value={book.age}
                        onChange={handleChange}
                    />
                </aside>
                <aside>
                    <label htmlFor="info">Info</label>
                    <input 
                        type="text" 
                        name="info"
                        placeholder="Info"
                        value={book.info}
                        onChange={handleChange}
                    />
                </aside>
                <footer>
                    <button><Link to="/">Cancel</Link></button>
                    <button type="submit"
                        >{updating ? "Adding..." : "Add Book"}
                    </button>
                    {saved && (
                        <section>Book added, redirecting...</section>
                    )}
                </footer>
            </form>
        </React.Fragment>
    );
};




