import React from 'react';
import {useQuery} from "@apollo/client";
import {ALL_BOOKS, ME} from "../queries";

function Recommend(props) {
    const result = useQuery(ALL_BOOKS);
    const me = useQuery(ME)

    if (!props.show) {
        return null
    }

    const favoriteGenres = me?.data.me.genres
    // Because favoriteGenres is a list, this checks if the books has a genre that is in the list of the user's favoriteGenres
    const books = result.data?.allBooks.filter(book => book.genres.some(genre => favoriteGenres.includes(genre))) ?? []

    return (
        <div>
            <h2>Recommendations</h2>
            <p>Books in your favourite genre <b>{favoriteGenres}</b></p>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {books.map((a) => (
                    <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Recommend;