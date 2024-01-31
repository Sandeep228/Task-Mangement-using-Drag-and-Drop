import "./App.css";
import CourseForm from "./components/CourseForm";
import CourseList from "./components/CourseList";
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import useCourseStore from "./app/courseStore";
import { ToastProvider } from 'react-toast-notifications';

function App() {
  const { courses, pending, complete } = useCourseStore((state) => ({
    courses: state.courses,
    pending: state.pending,
    complete: state.complete,
  }));

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = courses;
    let pending1 = pending;
    let complete1 = complete;

    // Source Logic
    if (source.droppableId === "Active") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === "Completed") {
      add = complete1[source.index];
      complete1.splice(source.index, 1);
    } else {
      add = pending1[source.index];
      pending1.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "Active") {
      active.splice(destination.index, 0, add);
    } else if (destination.droppableId === "Completed") {
      complete1.splice(destination.index, 0, add);
    } else {
      pending1.splice(destination.index, 0, add);
    }
  };

  return (
    <ToastProvider>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="main-container">
          <h1
            style={{
              fontSize: "2.5rem",
              marginBottom: "2rem",
            }}
          >
            {" "}
            Todo list
          </h1>
          <CourseForm />
          <CourseList />
        </div>
      </DragDropContext>
      </ToastProvider>
  );
}

export default App;
