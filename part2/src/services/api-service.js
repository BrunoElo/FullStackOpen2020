import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (payload) => {
  return axios.post(baseUrl, payload).then((response) => response.data);
};

const apiService = {
  getAll,
  create,
};

export default apiService;
