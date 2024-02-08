import "./App.css";
import CourseForm from "./components/CourseForm";
import CourseList from "./components/CourseList";
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import useCourseStore from "./app/courseStore";
import TaskList from "./components/Prority";
import { GanttComponent } from '@syncfusion/ej2-react-gantt';
import { ChakraProvider } from '@chakra-ui/react';


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
  const ganttData = courses.map((course) => ({
    TaskID: course.id.toString(),
    TaskName: course.title,
    StartDate: new Date(course.createdTime),
    EndDate: new Date(course.dueTime),
  }));

  const taskFields = {
    id: "TaskID",
    Title: "TaskName",
    startDate: "StartDate",
    endDate: "EndDate",
    duration: "Duration",
  };

  return (
 
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        style={{
          padding: "24px",
          backgroundColor: "#2f74c0",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            marginBottom: "2rem",
          }}
        >
          Todo list
        </h1>
        <div className="main-container">
          <CourseForm />
          <CourseList />
          <TaskList />
        </div>
        <div style={{padding:"24px" , backgroundColor:"#2f74c0"}}>
          <GanttComponent dataSource={ganttData} height="450px" taskFields={taskFields}/>
          </div>
      </div>
    </DragDropContext>

  );
}

export default App;
