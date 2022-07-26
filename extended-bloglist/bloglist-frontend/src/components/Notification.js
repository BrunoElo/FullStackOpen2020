import { Alert } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) {
    return null;
  } else {
    return (
      <Alert severity={notification.type}>
        <p>{notification.message}</p>
      </Alert>
    );
  }
};

export default Notification;
