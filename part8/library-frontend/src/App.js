import {useState} from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from "./components/Login";
import Notify from "./components/Notify";
import {useApolloClient, useSubscription} from "@apollo/client";
import Recommend from "./components/Recommend";
import {ALL_BOOKS, BOOK_ADDED} from "./queries";

// function that takes care of manipulating cache
export const updateCache = (cache, query, allBook) => {
    // helper that is used to eliminate saving same book twice
    const uniqByName = (a) => {
        let seen = new Set()
        return a.filter((item) => {
            let k = item.title
            return seen.has(k) ? false : seen.add(k)
        })
    }

    cache.updateQuery(query, ({ allBooks }) => {
        return {
            allBooks: uniqByName(allBooks.concat(allBook)),
        }
    })
}

const App = () => {
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(localStorage.getItem('phonenumbers-user-token'))
    const [errorMessage, setErrorMessage] = useState(null)
    const client = useApolloClient()

    useSubscription(BOOK_ADDED, {
        onData: ({data, client}) => {
            const addedBook = data.data.bookAdded;
            notify(`${addedBook.title} added`)
            updateCache(client.cache, {query: ALL_BOOKS, variables: {genre: null}}, addedBook)
        }
    })

    const notify = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 10000)
    }

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }


    return (
        <div>
            <Notify errorMessage={errorMessage} />
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {
                    token ? <>
                        <button onClick={() => setPage('add')}>add book</button>
                        <button onClick={() => setPage('recommend')}>recommend</button>
                        <button onClick={logout}>logout</button>
                    </> : <button onClick={() => setPage('login')}>login</button>
                }
            </div>
            <div>

                <Authors show={page === 'authors'} />

                <Books show={page === 'books'} />

                <NewBook show={page === 'add'} />
                <Recommend show={page === 'recommend'} />
                <Login
                    show={page === 'login'}
                    setToken={setToken}
                    token={token}
                    setError={notify}
                    setPage={setPage}
                />
            </div>
        </div>
    )
}

export default App
