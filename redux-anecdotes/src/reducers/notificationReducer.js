import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: null,
  reducers: {
    addNotification(state, action) {
      return action.payload;
    },
    removeNotification() {
      return null;
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;

let notificationTimeout = 0;

export const setNotification = (message, duration) => {
  clearTimeout(notificationTimeout);
  return (dispatch) => {
    dispatch(addNotification(message));
    notificationTimeout = setTimeout(() => {
      dispatch(removeNotification());
    }, duration * 1000);
  };
};

export default notificationSlice.reducer;
