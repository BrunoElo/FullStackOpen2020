import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { createBlog, initializeBlogs } from "./reducers/blogReducer";
import { loginUser, logoutUser } from "./reducers/userReducer";
import { blogService } from "./services/blogs";

const App = () => {
  const dispatch = useDispatch();
  const storeBlogs = useSelector((state) => state.blogs);
  const [blogs, setBlogs] = useState([]);
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Persist user login
  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("userDetails");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogFormRef = useRef();

  const handleAddBlog = (newBlog) => {
    dispatch(createBlog(newBlog));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleSortAsc = () => {
    const tempBlogArr = [...blogs];
    tempBlogArr.sort((a, b) => a.likes - b.likes);
    setBlogs(tempBlogArr);
  };
  const handleSortDesc = () => {
    const tempBlogArr = [...blogs];
    tempBlogArr.sort((a, b) => b.likes - a.likes);
    setBlogs(tempBlogArr);
  };

  if (user === null) {
    return (
      <>
        <Notification />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
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
        <Togglable
          ref={blogFormRef}
          buttonLabel1="new note"
          buttonLabel2="cancel"
        >
          <NewBlogForm createBlog={handleAddBlog} />
        </Togglable>
        <br />
        <button onClick={handleSortAsc}>sort by likes low to high</button>
        <button onClick={handleSortDesc}>sort by likes high to low</button>
        <br />
        {storeBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />
        ))}
      </>
    );
  }
};

export default App;
