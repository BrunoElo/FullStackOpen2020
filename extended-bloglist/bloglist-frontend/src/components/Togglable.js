import { Button } from "@mui/material";
import React, { useImperativeHandle, useState } from "react";

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel1}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>{props.buttonLabel2}</Button>
      </div>
    </>
  );
});

Togglable.displayName = "Togglable";
export default Togglable;
