import {useState} from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from "./components/Login";
import Notify from "./components/Notify";
import {useApolloClient} from "@apollo/client";

const App = () => {
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(localStorage.getItem('phonenumbers-user-token'))
    const [errorMessage, setErrorMessage] = useState(null)
    const client = useApolloClient()

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
                        <button onClick={logout}>logout</button>
                    </> : <button onClick={() => setPage('login')}>login</button>
                }
            </div>
            <div>

                <Authors show={page === 'authors'} />

                <Books show={page === 'books'} />

                <NewBook show={page === 'add'} />
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
