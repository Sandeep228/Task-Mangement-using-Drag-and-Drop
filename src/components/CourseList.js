import React from "react";
import useCourseStore from "../app/courseStore";
import Course from "./Course";

const CourseList = () => {
  const { courses, pending, complete } = useCourseStore((state) => ({
    courses: state.courses,
    pending: state.pending,
    complete: state.complete,
  }));
  const obj = {
    value: "Added",
    color: "	#ff7b7b",
    dragcolor: "#ff5252",
  };
  const obj1 = {
    value: "Started",
    color: "#ffb732",
    dragcolor: "#ffa500",
  };
  const obj2 = {
    value: "Completed",
    color: "#008000",
    dragcolor: "#005900",
  };

  return (
    <React.Fragment>    
      <div
        style={{
          display: "flex",
          width: "90%",
          padding: "20px",
          height: "100vh",
          gap: "12px",
        }}
      >
        <Course droppableId="Active" value={obj} items={courses} />
        <Course droppableId="Pending" value={obj1} items={pending} />
        <Course droppableId="Completed" value={obj2} items={complete} />
      </div>
    </React.Fragment>
  );
};

export default CourseList;
