import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { logoutUser, persistUser } from "./reducers/userReducer";
import { Route, Routes } from "react-router-dom";
import Users from "./components/Users";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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
