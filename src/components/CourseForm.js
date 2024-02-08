import React, { useState,useRef } from 'react';
import useCourseStore from '../app/courseStore';
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useToast } from '@chakra-ui/react';


function CourseForm() {
    const inputRef = useRef(null);
    const [courseDateTime, setCourseDateTime] = useState("");
    const [coursePriority, setCoursePriority] = useState("low");
    const addCourse = useCourseStore((state) => state.addCourse);
    const [courseTitle, setCourseTitle] = useState("");
    const toast = useToast();

    const handleCourseSubmit = () => {
        if (!courseTitle) {
          toast({
            title: 'Please add a course title!',
            status: 'error', 
            duration: 2000, 
            isClosable: true, 
          });
            return;
        }
        const currentTime = new Date();
        addCourse({
            id: Math.ceil(Math.random() * 1000000),
            title: courseTitle,
            completed:false,
            createdTime: currentTime,
            dueTime: courseDateTime,
            priority: coursePriority,
        })
        toast({
          title: 'Course added successfully',
          status: 'success', 
          duration: 2000, 
          isClosable: true, 
        });
       
          setCourseTitle("");
          inputRef.current.blur();
  }
  return (
    <div
  style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'linear-gradient(to bottom right, #3494e6, #ec6ead)',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  }}
>
  <div className="form-container">
    <input
      placeholder="Enter a Task"
      value={courseTitle}
      onChange={(e) => setCourseTitle(e.target.value)}
      className="form-input"
      ref={inputRef}
    />
    <button
      className="form-submit-btn"
      onClick={handleCourseSubmit}
    >
      Go
    </button>
  </div>
   
   <div style={{  marginBottom: '20px',
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "5px",
      width:"100%"}}>
       <label>Select a task Priority</label>
        <select
    value={coursePriority}
    onChange={(e) => setCoursePriority(e.target.value)}
    style={{
      padding: '10px',
      borderRadius: '5px',
      background: 'rgba(255, 255, 255, 0.8)',
    }}
  >
    <option value="high">High</option>
    <option value="medium">Medium</option>
    <option value="low">Low</option>
        </select>
   </div>
 
   <div style={{
    display:"flex",
    justifyContent:"space-between",
    alignContent:"center",
    width:"100%",
    gap:"5px"}}>
    <label>Enter a Due</label>
   <Datetime
    value={courseDateTime}
    onChange={(date) => setCourseDateTime(date.toDate())}
    style={{ marginBottom: '20px' }}
  />
   </div>
 
</div>

   
  )
}

export default CourseForm;


 