const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

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

export default reducer;
