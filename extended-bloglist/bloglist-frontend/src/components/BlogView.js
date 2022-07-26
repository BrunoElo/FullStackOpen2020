import React from "react";
import { useDispatch } from "react-redux";
import { likeBlog } from "../reducers/blogReducer";

const BlogView = ({ blog }) => {
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };
  if (!blog) {
    return null;
  }
  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes{" "}
        <button
          className="like-button"
          data-testid="like-btn"
          onClick={handleLike}
        >
          Like
        </button>
      </div>
      <div>added by {blog.user.username}</div>
    </div>
  );
};

export default BlogView;
