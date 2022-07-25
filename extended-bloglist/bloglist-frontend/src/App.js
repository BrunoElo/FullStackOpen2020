import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { createBlog, initializeBlogs } from "./reducers/blogReducer";
import { createNotification } from "./reducers/notificationReducer";
import { blogService } from "./services/blogs";

const App = () => {
  const dispatch = useDispatch();
  const storeBlogs = useSelector((state) => state.blogs);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Persist user login
  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("userDetails");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
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
    blogService
      .login({ username, password })
      .then((data) => {
        setUser(data);
        blogService.setToken(data.token);
        setUsername("");
        setPassword("");
        window.localStorage.setItem("userDetails", JSON.stringify(data));
        dispatch(createNotification("Login successful", 5, "error"));
      })
      .catch(() =>
        dispatch(createNotification("Wrong username or password", 5, "error"))
      );
  };

  const handleLogout = () => {
    blogService.logout();
    setUser(null);
    dispatch(createNotification("Successfully logged out", 5));
  };

  const handleLike = (updatedBlog, blogId) => {
    updatedBlog.user = user.id;
    blogService.update(updatedBlog, blogId).then((data) => {
      setBlogs(
        blogs.map((otherBlog) => (otherBlog.id !== blogId ? otherBlog : data))
      );
    });
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
          <Blog
            updateLike={handleLike}
            key={blog.id}
            blog={blog}
            blogs={blogs}
            setBlogs={setBlogs}
          />
        ))}
      </>
    );
  }
};

export default App;
