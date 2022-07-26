import React from "react";

const User = ({ user }) => {
  if (!user) {
    return null;
  }
  return (
    <>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      {user.blogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </>
  );
};

export default User;
