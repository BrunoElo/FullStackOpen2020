import { configureStore } from "@reduxjs/toolkit";
import anecdotesReducer from "./reducers/anecdoteReducer";

export const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
  },
});
