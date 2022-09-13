import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ course }: { course: CoursePart }) => {
  switch (course.type) {
    case "normal":
      return (
        <p>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <br /> {course.description}
        </p>
      );
    case "groupProject":
      return (
        <p>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <br />
          project exercises {course.groupProjectCount}
        </p>
      );
    case "submission":
      return (
        <p>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <br /> {course.description}
          <br /> submit to {course.exerciseSubmissionLink}
        </p>
      );

    case "special":
      return (
        <p>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <br /> {course.description}
          <br /> required skills: {course.requirements.join(", ")}
        </p>
      );

    default:
      return assertNever(course);
  }
};

export default Part;
