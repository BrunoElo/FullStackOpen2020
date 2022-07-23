import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createAnecdote = async (content) => {
  const payload = {
    content,
    votes: 0,
  };
  const response = await axios.post(baseUrl, payload);
  return response.data;
};

const updateAnecdote = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
  return response.data;
};

const anecdoteService = {
  getAnecdotes,
  createAnecdote,
  updateAnecdote,
};
export default anecdoteService;
