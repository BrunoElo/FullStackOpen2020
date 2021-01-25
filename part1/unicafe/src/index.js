import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  console.log(props);
  const { good, neutral, bad } = props;
  if (good + neutral + bad === 0) {
    return (
      <>
        <h3>Statistics</h3>
        <p>No feedback provided</p>
      </>
    );
  } else {
    return (
      <>
        <h3>Statistics</h3>
        <table>
          <tbody>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="Total feedback" value={good + neutral + bad} />
            <Statistic
              text="Average feedback"
              value={(good + neutral + bad) / 3}
            />
            <Statistic
              text="Positive feedback"
              value={(good / (good + neutral + bad)) * 100 || 0}
            />
          </tbody>
        </table>
      </>
    );
  }
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
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
      <Button handleClick={handleGoodClick} text="Good" />
      <Button handleClick={handleNeutralClick} text="Neutral" />
      <Button handleClick={handleBadClick} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
