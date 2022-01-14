import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BookAPI } from "../global/BookAPI";
import { IBook } from "../models/Interfaces";

export const Edit = (): JSX.Element => {
    const navigate = useNavigate();
    let match = useParams();
    const bookID = match._id;
    const [book, setBook] = React.useState<IBook>({
        _id: bookID, title: "", first: "", 
        last: "", age: 0, info: ""
    });

    const { data: bookData, 
        isSuccess: bookDataReady 
    } = BookAPI.useGetOneQuery(bookID!);

    const [deleteBook, {
        isLoading: isDeleting, isSuccess: isDeleted
    }] = BookAPI.useDeleteMutation();

    const [editBook, {
        isLoading: isUpdating, isSuccess: isSaved
    }] = BookAPI.useUpdateMutation();

    React.useEffect(() => {
        if (bookDataReady) {
            setBook(bookData!);
        };
    }, [bookData, bookDataReady]);

    function goBack(time: number) {
        setTimeout(() => {
            navigate("/");
        }, time);
    };

    function removeBook() {
        deleteBook(bookID!);
        goBack(700);
    };

    const handleChange =
    (event: React.ChangeEvent<HTMLInputElement>) => {
        setBook({...book, 
            [event.target.name]: event.target.value});
    };

    const handleSubmit =
    async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await editBook(book);
        setBook({
            _id: bookID, title: "", first: "", 
            last: "", age: 0, info: ""
        });
        goBack(700);
    };

    return (
        <React.Fragment>
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
                    <button 
                        onClick={removeBook}
                        >{isDeleting ? "Deleting..." : "Delete"}
                    </button>
                    <button 
                        type="submit"
                        >{isUpdating ? "Updating..." : "Update"}
                    </button>
                </footer>
                {isDeleted && (
                    <aside>The Book was deleted, redirecting...</aside>
                )}
                {isSaved && (
                    <aside>Book was saved, redirecting...</aside>
                )}
            </form>
        </React.Fragment>
    );
};




