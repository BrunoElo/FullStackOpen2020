import { createSlice, current } from "@reduxjs/toolkit";
import { blogService } from "../services/blogs";
import { createNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      console.log(current(state), action);
      return action.payload;
    },
    newBlog(state, action) {
      console.log(current(state), action);
      return [...state, action.payload];
    },
  },
});

export const { setBlogs, newBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const response = await blogService.getAll();
    dispatch(setBlogs(response));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const response = await blogService.create(blog);
      dispatch(newBlog(response));
      dispatch(createNotification("blog post succesfully added", 5));
    } catch (err) {
      dispatch(createNotification("Error in adding blog post", 5, "error"));
    }
  };
};

export default blogSlice.reducer;
