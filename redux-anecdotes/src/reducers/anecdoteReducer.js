import anecdoteService from "../services/anecdotes";
import { setNotification } from "./notificationReducer";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const votedAnecdote = action.data.anecdote;
      const newAnecdotes = state.map((anecdote) =>
        anecdote.id !== votedAnecdote.id ? anecdote : votedAnecdote
      );
      return newAnecdotes;
    case "CREATE":
      return [...state, action.data.content];
    case "SET":
      return action.data.anecdotes;
    default:
      return state;
  }
};

export const voteAnecdote = (anecdote) => {
  return {
    data: {
      anecdote,
    },
    type: "VOTE",
  };
};

export const createAnecdote = (content) => {
  return {
    data: {
      content,
    },
    type: "CREATE",
  };
};

export const setAnecdotes = (anecdotes) => {
  return {
    data: {
      anecdotes,
    },
    type: "SET",
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAnecdotes();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const newAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote(content);
    dispatch(createAnecdote(newAnecdote));
    dispatch(setNotification(`you created '${newAnecdote.content}'`, 10));
  };
};

export const handleAnecdoteVote = (anecdote) => {
  const votedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1,
  };
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.updateAnecdote(votedAnecdote);
    dispatch(voteAnecdote(newAnecdote));
  };
};

export default reducer;
