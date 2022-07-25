import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "../reducers/blogReducer";

const Users = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const authors = blogs.map((blog) => blog.author);
  const authorObj = {};
  for (let author of authors) {
    if (authorObj[author] >= 0) {
      authorObj[author] += 1;
    } else {
      authorObj[author] = 1;
    }
  }
  //   const authorsSet = newSet(authors);
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  console.log(authors, authorObj);
  return (
    <>
      <h2>User</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(authorObj).map((author, index) => (
            <tr key={index}>
              <td>{author[0]}</td>
              <td>{author[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
