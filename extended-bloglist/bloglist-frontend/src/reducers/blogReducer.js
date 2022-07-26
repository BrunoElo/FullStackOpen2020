import { createSlice } from "@reduxjs/toolkit";
import { blogService } from "../services/blogs";
import { createNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    newBlog(state, action) {
      return [...state, action.payload];
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      const newBlogs = state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      );
      return newBlogs;
    },
    deleteBlog(state, action) {
      const deletedBlogId = action.payload;
      const remainingBlogs = state.filter((blog) => blog.id !== deletedBlogId);
      return remainingBlogs;
    },
  },
});

export const { setBlogs, newBlog, updateBlog, deleteBlog } = blogSlice.actions;

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

export const likeBlog = (blog) => {
  const likedBlog = {
    likes: +blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url,
  };
  return async (dispatch) => {
    const response = await blogService.update(likedBlog, blog.id);
    dispatch(updateBlog(response));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id);
      dispatch(deleteBlog(id));
      dispatch(createNotification("Blog post deleted successfully", 5));
    } catch (err) {
      dispatch(
        createNotification(
          "Error!, can't delete a blog you didn't create",
          5,
          "error"
        )
      );
    }
  };
};

export default blogSlice.reducer;
