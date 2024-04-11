import {useState} from "react";
import {gql, useMutation} from "@apollo/client";
import {ALL_AUTHORS, SET_BIRTH_YEAR} from "../queries";

function BirthYear({authors}) {
    const [name, setName] = useState('');
    const [born, setBorn] = useState('')

    const [setBirthYear] = useMutation(SET_BIRTH_YEAR, {refetchQueries: [{query: ALL_AUTHORS}]})

    const submit = async (event) => {
        event.preventDefault();

        await setBirthYear({variables: {name, setBornTo: Number(born)}})

        setName('')
        setBorn('')
    }

    return (
        <form onSubmit={submit}>
            <h2>Set Birth Year</h2>
            <div>
                name
                <select
                    value={name}
                    onChange={({target}) => setName(target.value)}
                >
                    <option>Select author</option>
                    {authors.map(author => <option key={author.name} value={author.name}>{author.name}</option>)}
                </select>
            </div>
            <div>
            born
                <input
                    value={born}
                    onChange={({target}) => setBorn(target.value)}
                />
            </div>
            <button type="submit">Update Author</button>

        </form>
    );
}

export default BirthYear;
