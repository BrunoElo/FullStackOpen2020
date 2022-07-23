import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleAnecdoteVote, voteAnecdote } from "../reducers/anecdoteReducer";
import {
  removeNotification,
  setNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes)
  );

  const dispatch = useDispatch();

  const handleNotification = (data) => {
    dispatch(setNotification(data));
    setTimeout(() => {
      dispatch(removeNotification(null));
    }, 5000);
  };

  const vote = (anecdote) => {
    dispatch(handleAnecdoteVote(anecdote));
    // handleNotification({ data: id, type: "vote" });
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
