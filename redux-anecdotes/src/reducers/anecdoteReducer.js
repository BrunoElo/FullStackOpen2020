import anecdoteService from "../services/anecdotes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const id = action.data.id;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      const newAnecdotes = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : votedAnecdote
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

export const voteAnecdote = (anecdoteId) => {
  return {
    data: {
      id: anecdoteId,
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
    console.log(newAnecdote);
    dispatch(createAnecdote(newAnecdote));
  };
};

export default reducer;
