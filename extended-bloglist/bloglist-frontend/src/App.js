import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { logoutUser, persistUser } from "./reducers/userReducer";
import { Route, Routes, useMatch } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const match = useMatch("/users/:id");
  const individualUser = match
    ? users.find((user) => user.id === match.params.id)
    : null;

  useEffect(() => {
    dispatch(persistUser());
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (user === null) {
    return (
      <>
        <Notification />
        <LoginForm />
      </>
    );
  } else {
    return (
      <>
        <Notification />
        <h2>blogs</h2>
        <span>{user.username} is logged in.</span>
        <button id="logout-button" onClick={handleLogout}>
          Logout
        </button>

        <Routes>
          <Route path="/users/:id" element={<User user={individualUser} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </>
    );
  }
};

const Home = () => {
  const blogFormRef = useRef();

  return (
    <>
      <Togglable
        ref={blogFormRef}
        buttonLabel1="new note"
        buttonLabel2="cancel"
      >
        <NewBlogForm />
      </Togglable>
      <BlogList />
    </>
  );
};

export default App;
