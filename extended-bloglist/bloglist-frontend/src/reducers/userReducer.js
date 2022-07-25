import { createSlice } from "@reduxjs/toolkit";
import { blogService } from "../services/blogs";
import { createNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const loginUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await blogService.login(userData);
      window.localStorage.setItem("userDetails", JSON.stringify(response));
      blogService.setToken(response.token);
      dispatch(setUser(response));
      dispatch(createNotification("Login successful", 5));
    } catch (err) {
      dispatch(createNotification("Wrong username or password", 5, "error"));
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    blogService.logout();
    dispatch(setUser(null));
    dispatch(createNotification("Successfully logged out", 5));
  };
};

export const persistUser = () => {
  return (dispatch) => {
    const loggedInUser = window.localStorage.getItem("userDetails");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  };
};

export default userSlice.reducer;
