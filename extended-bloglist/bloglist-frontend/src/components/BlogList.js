import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { initializeBlogs } from "../reducers/blogReducer";

export const Blog = ({ blog }) => {
  // const dispatch = useDispatch();
  // const [visible, setVisible] = useState(false);

  // const blogStyle = {
  //   padding: "1rem",
  //   boxShadow: "1px 1px 10px #9692926b",
  //   marginBottom: ".5rem",
  //   borderRadius: 8,
  //   backgroundColor: visible ? "orange" : "white",
  //   transition: "background-color 1s",
  // };

  // const handleLike = () => {
  //   dispatch(likeBlog(blog));
  // };

  // const handleDelete = () => {
  //   if (
  //     window.confirm(`Are you sure you want to delete ${blog.title} blog post`)
  //   ) {
  //     dispatch(removeBlog(blog.id));
  //   }
  // };

  return (
    <Link to={`blogs/${blog.id}`}>
      <div
        style={{ padding: ".5rem", border: "1px solid grey", margin: ".25rem" }}
      >
        {blog.title} {blog.author}
      </div>
    </Link>
    // <div style={blogStyle}>
    //   <span id="blog-content">
    //     {blog.title} {blog.author}{" "}
    //     <button data-testid="visible-btn" onClick={() => setVisible(!visible)}>
    //       {!visible ? "show" : "hide"}
    //     </button>{" "}
    //     <button onClick={handleDelete}>Delete</button>
    //   </span>
    //   {visible && (
    //     <div>
    //       <div>{blog.url}</div>
    //       <div>
    //         {" "}
    //         {blog.likes}{" "}
    //         <button
    //           className="like-button"
    //           data-testid="like-btn"
    //           onClick={handleLike}
    //         >
    //           Like
    //         </button>
    //       </div>
    //     </div>
    //   )}
    //   {/* Using Togglable component which does not provide desired result
    //    <Togglable buttonLabel1="show" buttonLabel2="hide">
    //     {blog.url} {blog.likes} <button>Like</button>
    //   </Togglable> */}
    // </div>
  );
};

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!blogs.length) {
      dispatch(initializeBlogs());
    }
  }, [dispatch]);

  const handleSortAsc = () => {
    const tempBlogArr = [...blogs];
    tempBlogArr.sort((a, b) => a.likes - b.likes);
  };
  const handleSortDesc = () => {
    const tempBlogArr = [...blogs];
    tempBlogArr.sort((a, b) => b.likes - a.likes);
  };

  return (
    <>
      <br />
      <button onClick={handleSortAsc}>sort by likes low to high</button>
      <button onClick={handleSortDesc}>sort by likes high to low</button>
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default BlogList;
