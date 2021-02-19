import React, { useEffect, useState } from "react";
import apiService from "../services/api-service";

const Search = ({ searchName, handleSearchNameChange }) => {
  return (
    <div>
      Search:
      <input value={searchName} onChange={handleSearchNameChange} />
    </div>
  );
};

const Form = (props) => {
  const {
    newName,
    newNumber,
    handleNameChange,
    handleNumberChange,
    addName,
  } = props;
  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
        <br />
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={addName}>
          add
        </button>
      </div>
    </form>
  );
};

const List = ({ persons, setPersons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Persons
          persons={persons}
          key={person.name}
          person={person}
          setPersons={setPersons}
        />
      ))}
    </ul>
  );
};

const Persons = ({ person, setPersons, persons }) => {
  const remove = (id, name) => () => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      apiService.deleteItem(id).then((response) => {
        if (response.status === 200) {
          const newPersons = persons.filter((person) => person.id !== id);
          setPersons(newPersons);
        }
      });
    }
  };

  return (
    <li>
      {person.name} {person.number}{" "}
      <button onClick={remove(person.id, person.name)}>Delete</button>
    </li>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);

  const [searchList, setSearchList] = useState(persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    apiService.getAll().then((response) => {
      setPersons(response);
      setSearchList(response);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already in phonebook`);
    } else {
      const payload = { name: newName, number: newNumber };

      apiService.create(payload).then((response) => {
        console.log(response);
        setPersons(persons.concat(response));
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value);
    const result = searchList.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    console.log(result);
    setPersons(result);
  };

  return (
    <div>
      <Search
        searchName={searchName}
        handleSearchNameChange={handleSearchNameChange}
      />
      <h2>Phonebook</h2>
      <Form
        newName={newName}
        newNumber={newNumber}
        addName={addName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <List persons={persons} setPersons={setPersons} />
    </div>
  );
};

export default App;
