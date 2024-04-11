import {useQuery} from "@apollo/client";
import {ALL_BOOKS} from "../queries";
import {useState} from "react";

const Books = (props) => {
    const [genre, setGenre] = useState(null)
    const [genres, setGenres] = useState([])
    const {data} = useQuery(ALL_BOOKS, {
        variables: {genre}, // makes it seen as a different query
        onCompleted: () => {
            if (!genre) { // Only run if genre is null meaning (All genre)
            setGenres([...new Set(data?.allBooks.map(book => book.genres).flat())])
            }
        }
    });
    const books = data?.allBooks ?? []

    if (!props.show) {
        return null
    }

    return (
        <div>
            <h2>books</h2>

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
            {genres.map(genre => (<button key={genre} onClick={() => setGenre(genre)}>{genre}</button>))}
            <button onClick={() => setGenre(null)}>All genre</button>
        </div>
    )
}

export default Books
