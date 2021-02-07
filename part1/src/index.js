import React, { useState } from "react";
import ReactDOM from "react-dom";

const HighestVote = (props) => {
  return (
    <div>
      <h3>Anecdote with highest votes</h3>
      <div>{props.anecdotes[props.index]}</div>
      <p>Number of votes: {props.points[props.index]}</p>
    </div>
  );
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(6).fill(0));
  const [highestVoteIndex, setHighestVoteIndex] = useState(0);
  const [voteCount, setVoteCount] = useState(0);

  // returns a random integer from min to max (inclusive)
  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + 1) + min;
  };

  // Wrapper function that calls or returns a function (closures)
  const changeSelect = (min, max) => {
    return () => setSelected(randomInt(min, max));
  };

  const incrementVote = () => {
    const copy = [...points];
    copy[selected] += 1;
    return () => setPoints(copy);
  };

  if (points[selected] > voteCount) {
    setVoteCount(points[selected]);
    setHighestVoteIndex(selected);
  }

  return (
    <div>
      <h3>Anecdote</h3>
      <div>{props.anecdotes[selected]}</div>
      <p>Number of votes: {points[selected]}</p>
      <Button handleClick={changeSelect(0, 5)} text="next anecdote" />
      <Button handleClick={incrementVote()} text="vote" />
      <HighestVote
        anecdotes={anecdotes}
        points={points}
        index={highestVoteIndex}
      />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
