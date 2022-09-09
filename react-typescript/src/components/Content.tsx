import React from "react";
import { CourseParts } from "../App";

const Content = ({ courseParts }: { courseParts: CourseParts[] }) => {
  return (
    <>
      {courseParts.map((course) => (
        <p key={course.name}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </>
  );
};

export default Content;
