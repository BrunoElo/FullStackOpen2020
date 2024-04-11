import React, {useEffect, useState} from 'react';
import {gql, useMutation} from "@apollo/client";
import {LOGIN} from "../queries";

function Login({ setError, setToken, show, token, setPage }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        }
    })


    useEffect(() => {
        if ( result.data ) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('phonenumbers-user-token', token)
            setPage("books")
        }
    }, [result.data])

    if (!show || token) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()

        await login({variables: {username, password}})

    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={submit}>
                <div>
                    username <input
                    value={username}
                    onChange={({target}) => setUsername(target.value)}
                />
                </div>
                <div>
                    password <input
                    type='password'
                    value={password}
                    onChange={({target}) => setPassword(target.value)}
                />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    );
}

export default Login;