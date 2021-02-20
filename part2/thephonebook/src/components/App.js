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

const List = ({ persons, setPersons, setNotify }) => {
  console.log(persons);
  return (
    <ul>
      {persons.map((person) => {
        return (
          <Persons
            persons={persons}
            key={person.id}
            person={person}
            setPersons={setPersons}
            setNotify={setNotify}
          />
        );
      })}
    </ul>
  );
};

const Persons = ({ person, setPersons, persons, setNotify }) => {
  const remove = (id, name) => () => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      apiService
        .deleteItem(id)
        .then((response) => {
          const newPersons = persons.filter((person) => person.id !== id);
          setPersons(newPersons);
          setNotify(`${name} successfully deleted`);
          setTimeout(() => setNotify(null), 4000);
        })
        .catch((error) => {
          setNotify(`Sorry, ${name} may have been deleted from the database`);
          setTimeout(() => setNotify(null), 4000);
          setPersons(persons.filter((person) => person.id !== id));
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

const Notification = ({ notify }) => {
  if (!notify) {
    return null;
  } else if (notify.includes("Sorry")) {
    return (
      <div className="error-notification">
        <p>{notify}</p>
      </div>
    );
  }
  return (
    <div className="success-notification">
      <p>{notify}</p>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);

  const [searchList, setSearchList] = useState(persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [notify, setNotify] = useState("");

  useEffect(() => {
    apiService.getAll().then((response) => {
      setPersons(response);
      setSearchList(response);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const payload = { name: newName, number: newNumber };

    if (persons.some((person) => person.name === newName)) {
      //alert(`${newName} is already in phonebook`);
      const entry = persons.find(({ name }) => name === newName);

      if (
        window.confirm(
          `${newName} is already in phonebook, do you want to replace the number?`
        )
      ) {
        apiService
          .update(entry.id, payload)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== entry.id ? person : response.data
              )
            );
            setNotify(`${newName} successfully updated`);
            setTimeout(() => setNotify(null), 4000);
          })
          .catch((error) => {
            /*  alert(
              `Sorry, ${entry.name} may have been deleted from the database`
            ); */
            setNotify(
              `Sorry, ${entry.name} may have been deleted from the database`
            );
            setTimeout(() => setNotify(null), 4000);
            setPersons(persons.filter((person) => person.id !== entry.id));
          });
      }
    } else {
      apiService.create(payload).then((response) => {
        setPersons(persons.concat(response));
        setNotify(`${newName} successfully added`);
        setTimeout(() => setNotify(null), 5000);
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
    setPersons(result);
  };

  return (
    <div>
      <Notification notify={notify} />
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
      <List persons={persons} setPersons={setPersons} setNotify={setNotify} />
    </div>
  );
};

export default App;
