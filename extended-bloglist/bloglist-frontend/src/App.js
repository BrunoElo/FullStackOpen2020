import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { logoutUser, persistUser } from "./reducers/userReducer";
import { Link, Route, Routes, useMatch } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";
import BlogView from "./components/BlogView";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);
  const match = useMatch("/users/:id");
  const individualUser = match
    ? users.find((user) => user.id === match.params.id)
    : null;
  const matchBlog = useMatch("/blogs/:id");
  const blog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null;

  useEffect(() => {
    dispatch(persistUser());
  }, []);

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
        <Menu user={user} />
        <h2>blog app</h2>

        <Routes>
          <Route path="/blogs/:id" element={<BlogView blog={blog} />} />
          <Route path="/users/:id" element={<User user={individualUser} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </>
    );
  }
};

const Menu = ({ user }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <Link to="/">blogs</Link>
      {"  "}
      <Link to="/users">users</Link>
      {"  "}
      <span>{user.username} is logged in.</span>
      <button id="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
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
