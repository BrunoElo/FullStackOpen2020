import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

const NewBlogForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleAddBlog = (event) => {
    event.preventDefault();
    dispatch(createBlog({ title, author, url }));
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h2>Add new blog post</h2>
      <form id="new-blog-form" onSubmit={handleAddBlog}>
        <label>Title</label>
        <input
          id="title"
          value={title}
          type="text"
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        <label>Author</label>
        <input
          id="author"
          value={author}
          type="text"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        <label>Url</label>
        <input
          id="url"
          value={url}
          type="text"
          onChange={({ target }) => setUrl(target.value)}
        />
        <br />
        <button id="create-blog" type="submit">
          Create
        </button>
      </form>
    </>
  );
};

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default NewBlogForm;
