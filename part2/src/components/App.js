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

// Renders the country data
const Views = ({ persons }) => {
  if (persons[0] === "") {
    return null;
  } else {
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
  }
};

// Renders result list from search
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
    return <Views persons={persons} />;
  } else {
    return null;
  }
};

// Renders individual result in list
const Persons = ({ person }) => {
  const [show, setShow] = useState(false);
  const showInfo = () => {
    setShow(!show);
  };
  return (
    <div>
      <li>{person.name}</li>
      <button onClick={showInfo} value={person}>
        show
      </button>
      {show && <Views persons={[person]} />}
    </div>
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
    // if the input is empty
    if (!event.target.value) {
      result = [];
    }
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
