import React, { useEffect, useState } from "react";
import "./App.css";
import { addDiary, getDiaries } from "./services/apiService";
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "./types";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string>("");
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
    comment: "",
    date: "",
    visibility: Visibility.Ok,
    weather: Weather.Cloudy,
  });

  useEffect(() => {
    getDiaries().then((response) => setDiaries(response));
  }, []);

  const submitDiaryEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    addDiary(newDiary)
      .then((response) => {
        setDiaries((state) => [...state, response.data]);
      })
      .catch((error) => {
        setError(error.response.data);
        setTimeout(() => {
          setError("");
        }, 4000);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewDiary((state) => ({ ...state, [name]: value }));
  };

  return (
    <>
      <h2>Add new entry</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={submitDiaryEntry}>
        date
        <input
          type="date"
          name="date"
          value={newDiary.date}
          onChange={handleChange}
        />
        <br />
        visibility:
        {Object.values(Visibility).map((visibility) => (
          <span key={visibility}>
            <label htmlFor={visibility}>{visibility}</label>
            <input
              id={visibility}
              type="radio"
              name="visibility"
              checked={visibility === newDiary.visibility}
              value={visibility}
              onChange={handleChange}
            />
          </span>
        ))}
        <br />
        weather:
        {Object.values(Weather).map((weather) => (
          <span key={weather}>
            <label htmlFor={weather}>{weather}</label>
            <input
              id={weather}
              type="radio"
              name="weather"
              value={weather}
              checked={weather === newDiary.weather}
              onChange={handleChange}
            />
          </span>
        ))}
        <br />
        comment
        <input
          name="comment"
          value={newDiary.comment}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Add</button>
      </form>

      <h2 className="App">Diary entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <div>visibility: {diary.visibility}</div>
          <div>weather: {diary.weather}</div>
          <div>comment: {diary.comment}</div>
        </div>
      ))}
    </>
  );
}

export default App;
