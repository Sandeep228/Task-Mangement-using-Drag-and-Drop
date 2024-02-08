import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import useCourseStore from "../app/courseStore";
import Modal from "./Modal";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { useToast } from '@chakra-ui/react';

const Course = ({ droppableId, value, items }) => {

  const {
    courses,
    removeCourse,
    toggleCourseStatus,
    updateCourse,
    pending,
    complete,
  } = useCourseStore((state) => ({
    courses: state.courses,
    removeCourse: state.removeCourse,
    toggleCourseStatus: state.toggleCourseStatus,
    updateCourse: state.updateCourse,
    pending: state.pending,
    complete: state.complete,
  }));
  const toast = useToast();

  const [updatecourseTitle, setUpdateCourseTitle] = useState("");
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);

  const handleCourseUpdate1 = (id) => {
    updateCourse(id, updatecourseTitle);
    toast({
      title: 'course updated!',
      status: 'success', 
      duration: 2000, 
      isClosable: true, 
    });
    setShow(false);
    setUpdateCourseTitle("");
  };
  const handleCourseUpdate = (id, origin) => {
    if (origin === "Added") {
      const rt = courses.find((course) => course.id === id);
      setUpdateCourseTitle(rt.title);
      setId(rt.id);
      setShow(true);
    } else if (origin === "Started") {
      const rt = pending.find((course) => course.id === id);
      setUpdateCourseTitle(rt.title);
      setId(rt.id);
      setShow(true);
    } else {
      const rt = complete.find((course) => course.id === id);
      setUpdateCourseTitle(rt.title);
      setId(rt.id);
      setShow(true);
    }
  };
  return (
    <React.Fragment>
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              flex: 1,
              borderRadius: "10px",
              boxShadow: "0 0 5px #000",
              backgroundColor: snapshot.isDraggingOver
              ? value.dragcolor
              : value.color,
            }}
          >
            <h1
              style={{
                textAlign: "center",
                backgroundColor: "aqua",
                color: "black",
              }}
            >
              {value.value}
            </h1>
            <ul>
              {items.map((course, i) => (
                <Draggable
                  key={course.id}
                  draggableId={course.id.toString()}
                  index={i}
                >
                  {(provided, snapshot) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className={`course-item ${snapshot.isDragging ? "drag" : ""}`}
                    >
                      <span className="course-item-col-1">
                        <input
                          checked={course.completed}
                          type="checkbox"
                          onChange={(e) => {
                            toggleCourseStatus(course.id);
                          }}
                        />
                      </span>
                      <span
                        style={{
                          textDecoration: course.completed
                            ? "line-through"
                            : "none",
                          fontSize: "24px",
                          color: course.completed ? "black" : "white",
                        }}
                      >
                        {course.title}
                      </span>
                      <div
                        style={{
                          gap: "12px",
                          display: "flex",
                          fontSize: "18px",
                        }}
                      >
                        <button
                          onClick={() => {
                            removeCourse(course.id);
                            toast({
                              title: 'course delete!',
                              status: 'success', 
                              duration: 2000, 
                              isClosable: true, 
                            });
                            
                          }}
                          className="delete-btn"
                        >
                          <RiDeleteBin5Fill size="24px" />
                        </button>
                        <button
                          onClick={() => {
                            handleCourseUpdate(course.id, value.value);
                          }}
                          className="update-btn"
                        >
                          <MdOutlineSystemUpdateAlt size="24px" />
                        </button>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
            </ul>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {show ? (
        <Modal
          show={show}
          onClose={() => setShow(false)}
          onUpdate={handleCourseUpdate1}
          updatecourseTitle={updatecourseTitle}
          setUpdateCourseTitle={setUpdateCourseTitle}
          id={id}
        />
      ) : null}
    </React.Fragment>
  );
};

export default Course;
