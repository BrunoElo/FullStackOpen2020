import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // corresponding states for each button
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h2>Give Feedback</h2>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <h3>Statistics</h3>
      <>
        <p>good:{good}</p>
        <p>neutral:{neutral}</p>
        <p>bad:{bad}</p>
        <p>total feedback:{good + neutral + bad}</p>
        <p>average feedback:{(good + neutral + bad) / 3}</p>
        <p>positive feedback:{(good / (good + neutral + bad)) * 100 || 0}</p>
      </>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
