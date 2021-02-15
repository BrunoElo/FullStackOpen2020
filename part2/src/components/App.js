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

const Weather = ({ weather }) => {
  console.log(weather);
  return (
    <div>
      <h3>Weather in {weather.name}</h3>
      <h5>Temperature: {weather.main.temp}K</h5>
      <h5>Weather Description: {weather.weather[0].description}</h5>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather"
      ></img>
      <h5>Wind speed: {weather.wind.speed}m/s</h5>
    </div>
  );
};

// Renders the country data
const Views = ({ persons }) => {
  const [weather, setWeather] = useState("");
  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const cityName = persons[0].capital;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [persons]);
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
        {weather && <Weather weather={weather} />}
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
  const [btn, setBtn] = useState("show");
  const showInfo = () => {
    setShow(!show);
    if (show) {
      setBtn("show");
    } else {
      setBtn("hide");
    }
  };
  return (
    <div>
      <li>{person.name}</li>
      <button onClick={showInfo} value={person}>
        {btn}
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
