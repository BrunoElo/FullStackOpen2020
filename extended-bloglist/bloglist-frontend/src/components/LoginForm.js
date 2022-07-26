import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  return (
    <>
      <h2>Log in to the application</h2>
      <form onSubmit={handleLogin}>
        <div style={{ margin: ".5rem" }}>
          <TextField
            label="username"
            ype="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div style={{ margin: ".5rem" }}>
          <TextField
            label="password"
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          id="login-button"
          type="submit"
        >
          Login
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
