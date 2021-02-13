import React, { useState } from "react";

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

const List = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Persons key={person.name} person={person} />
      ))}
    </ul>
  );
};

const Persons = ({ person }) => {
  return (
    <li>
      {person.name} {person.number}
    </li>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "09044994499" },
    { name: "Bell Zalo", number: "09044994498" },
    { name: "Mylo Drese", number: "09044994439" },
    { name: "Lasa Feri", number: "09044994429" },
    { name: "Sara Goli", number: "09044994419" },
  ]);

  const [searchList] = useState(persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  const addName = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already in phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
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
      <List persons={persons} />
    </div>
  );
};

export default App;
