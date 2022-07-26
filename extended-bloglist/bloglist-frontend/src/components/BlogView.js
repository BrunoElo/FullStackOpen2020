import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { commentOnBlog, likeBlog } from "../reducers/blogReducer";

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
      <CommentSection blog={blog} />
    </div>
  );
};

const CommentSection = ({ blog }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const commentOnBlogPost = async (event) => {
    event.preventDefault();
    dispatch(commentOnBlog({ comment }, blog.id));
    setComment("");
  };

  return (
    <>
      <h3>comments</h3>
      <form onSubmit={commentOnBlogPost}>
        <input value={comment} onChange={(e) => setComment(e.target.value)} />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments
          .map((comment) => <li key={comment.id}>{comment.comment}</li>)
          .reverse()}
      </ul>
    </>
  );
};

export default BlogView;
