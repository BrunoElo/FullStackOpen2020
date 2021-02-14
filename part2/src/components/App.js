import React, { useEffect, useState } from "react";
import axios from "axios";

const Search = ({ searchName, handleSearchNameChange }) => {
  return (
    <div>
      Search:
      <input value={searchName} onChange={handleSearchNameChange} />
    </div>
  );
};

const List = ({ persons }) => {
  if (persons.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (persons.length > 1 && persons.length <= 10) {
    return (
      <ul>
        {persons.map((person) => (
          <Persons key={person.name} person={person} />
        ))}
      </ul>
    );
  } else if (persons.length === 1) {
    return (
      <div>
        <h1>{persons[0].name}</h1>
        <p>Capital: {persons[0].capital}</p>
        <p>Population: {persons[0].population}</p>
        <h3>Languages</h3>
        <ul>
          {persons[0].languages.map((lang) => (
            <li key={lang.iso639_1}>{lang.name}</li>
          ))}
        </ul>
        <h2>Flag</h2>
        <img width="100px" src={persons[0].flag} alt="flag"></img>
      </div>
    );
  } else {
    return null;
  }
};

const Persons = ({ person }) => {
  return (
    <li>
      {person.name} {person.number}
    </li>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);

  const [searchList, setSearchList] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setSearchList(response.data);
    });
  }, []);

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value);
    let result = searchList.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    if (!event.target.value) {
      result = [];
    }
    console.log(result);
    setPersons(result);
  };

  return (
    <div>
      <Search
        searchName={searchName}
        handleSearchNameChange={handleSearchNameChange}
      />
      <h2>Result</h2>
      <List persons={persons} />
    </div>
  );
};

export default App;
