import React, { useState,useRef } from 'react';
import useCourseStore from '../app/courseStore';
import { useToasts } from 'react-toast-notifications';



function CourseForm() {
    const { addToast } = useToasts();
    const inputRef = useRef(null);


    const addCourse = useCourseStore((state) => state.addCourse);
    const [courseTitle, setCourseTitle] = useState("");

    const handleCourseSubmit = () => {
      
        if (!courseTitle) {
            addToast('Please add a course title!', {
                appearance: 'error',
                autoDismiss: true,
              });
            return;
        }
        addCourse({
            id: Math.ceil(Math.random() * 1000000),
            title: courseTitle,
            completed:false
        })
        addToast('Course added successfully', {
            appearance: 'success',
            autoDismiss: true,
          });
          setCourseTitle("");
          inputRef.current.blur();
          }

  return (
   <div className="form-container">
    <input          placeholder="Enter a Task"
 value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} className="form-input" ref={inputRef}/>
    <button  className="form-submit-btn" onClick={handleCourseSubmit}>Go</button>
   </div>
  )
}

export default CourseForm;


 