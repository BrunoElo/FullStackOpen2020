import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    padding: "1rem",
    boxShadow: "1px 1px 10px #9692926b",
    marginBottom: ".5rem",
    borderRadius: 8,
    backgroundColor: visible ? "orange" : "white",
    transition: "background-color 1s",
  };

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleDelete = () => {
    if (
      window.confirm(`Are you sure you want to delete ${blog.title} blog post`)
    ) {
      dispatch(removeBlog(blog.id));
    }
  };

  return (
    <div style={blogStyle}>
      <span id="blog-content">
        {blog.title} {blog.author}{" "}
        <button data-testid="visible-btn" onClick={() => setVisible(!visible)}>
          {!visible ? "show" : "hide"}
        </button>{" "}
        <button onClick={handleDelete}>Delete</button>
      </span>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            {" "}
            {blog.likes}{" "}
            <button
              className="like-button"
              data-testid="like-btn"
              onClick={handleLike}
            >
              Like
            </button>
          </div>
        </div>
      )}
      {/* Using Togglable component which does not provide desired result
       <Togglable buttonLabel1="show" buttonLabel2="hide">
        {blog.url} {blog.likes} <button>Like</button>
      </Togglable> */}
    </div>
  );
};

export default Blog;
