import {useQuery} from "@apollo/client";
import {ALL_BOOKS} from "../queries";
import {useState} from "react";

const Books = (props) => {
    const [genre, setGenre] = useState(null)
    const result = useQuery(ALL_BOOKS);

    if (!props.show) {
        return null
    }

    const books = result.data?.allBooks ?? []
    const genres = [...new Set(books.map(book => book.genres).flat())]

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
                    (genre ? genre && a.genres.includes(genre) : true) && // 👏
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
