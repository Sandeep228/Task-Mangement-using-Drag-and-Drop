import React, { useState } from "react";
import useCourseStore from "../app/courseStore";

const TaskList = () => {
  const { courses } = useCourseStore((state) => ({
    courses: state.courses,
  }));

  const [selectedPriority, setSelectedPriority] = useState("all");

  const filterTasks = () => {
    if (selectedPriority === "all") {
      return courses;
    } else {
      return courses.filter((task) => task.priority === selectedPriority);
    }
  };

  const sortedTasks = filterTasks().sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="task-list-card">
      <h2 style={{ color: "black" }}>Task List</h2>
      <div className="button-container">
        <button
          onClick={() => setSelectedPriority("all")}
          className="gradient-btn"
        >
          All Tasks
        </button>
        <button
          onClick={() => setSelectedPriority("high")}
          className="gradient-btn high-priority"
        >
          High Priority
        </button>
        <button
          onClick={() => setSelectedPriority("medium")}
          className="gradient-btn medium-priority"
        >
          Medium Priority
        </button>
        <button
          onClick={() => setSelectedPriority("low")}
          className="gradient-btn low-priority"
        >
          Low Priority
        </button>
      </div>
      <ul>
        {sortedTasks.map((task) => (
          <li
            key={task.id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
              textAlign:"center"
            }}
          >
            <strong> Task - {task.title}</strong> 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
