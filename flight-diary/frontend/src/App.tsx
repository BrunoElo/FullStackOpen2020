import React, { useEffect, useState } from "react";
import "./App.css";
import { getDiaries } from "./services/apiService";
import { DiaryEntry } from "../../backend/src/types";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getDiaries().then((response) => setDiaries(response));
  }, []);

  return (
    <>
      <h1 className="App">Diary entries</h1>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h2>{diary.date}</h2>
          <div>visibility: {diary.visibility}</div>
          <div>weather: {diary.weather}</div>
          <div>comment: {diary.comment}</div>
        </div>
      ))}
    </>
  );
}

export default App;
