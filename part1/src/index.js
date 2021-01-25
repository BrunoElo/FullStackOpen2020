import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistics = (props) => {
  console.log(props);
  const { good, neutral, bad } = props;
  return (
    <>
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

const App = () => {
  // corresponding states for each button
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // reference function methods to handle events
  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <>
      <h2>Give Feedback</h2>
      <button onClick={handleGoodClick}>Good</button>
      <button onClick={handleNeutralClick}>Neutral</button>
      <button onClick={handleBadClick}>Bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
