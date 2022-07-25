import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export const createNotification = (message, duration, type = "success") => {
  return async (dispatch) => {
    dispatch(setNotification({ message, type }));
    setTimeout(() => {
      dispatch(setNotification(null));
    }, duration * 1000);
  };
};

export default notificationSlice.reducer;
