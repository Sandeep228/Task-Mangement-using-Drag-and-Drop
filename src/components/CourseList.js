import React,{useState} from 'react'
import useCourseStore from '../app/courseStore'

const CourseList = () => {
  const [updatecourseTitle, setUpdateCourseTitle] = useState("");
  const [id,setId]  = useState("");
  const [show,setShow] = useState(false);

  const {courses, removeCourse, toggleCourseStatus,updateCourse} = useCourseStore(
        (state) => ({
            courses: state.courses,
            removeCourse: state.removeCourse,
            toggleCourseStatus: state.toggleCourseStatus,
            updateCourse:state.updateCourse
        })
    )

    const handleCourseUpdate  =(id) => {
      const rt =  courses.filter((course) => course.id == id);
      setUpdateCourseTitle(rt[0].title);
      setId(rt[0].id)
      setShow(true);
      }
      const handleCourseUpdate1  =(id) =>  {
       updateCourse(id,updatecourseTitle);     
       setShow(false);
       setUpdateCourseTitle("");
      }
  return (
    <React.Fragment>
    <ul>
        {courses.map((course, i) => {
            return (
                <React.Fragment key={i}>
                    <li
                    className={`course-item`}
                    style={{
                        backgroundColor: course.completed ? "gold" : "grey",
                    }}
                    >
                        <span className="course-item-col-1">
                            <input 
                            checked={course.completed}
                            type="checkbox"
                            onChange={(e) => {
                                toggleCourseStatus(course.id)
                            }}
                            />
                        </span>
                        <span style={{
                           textDecoration: course.completed ? "line-through" : "none", 
                           fontSize:"18px",
                           color:course.completed ? "black" : "white"
                        }}>{course.title}</span>
                        <div style={{    gap: "12px",
                              display: "flex",
                              fontSize:"18px"}}>
                        <button 
                        onClick={() => {
                            removeCourse(course.id)
                        }}
                        className="delete-btn">Delete</button>
                         <button 
                        onClick={() => {
                          handleCourseUpdate(course.id)
                        }}
                        className="update-btn">Update</button>
                        </div>
                    </li>
                </React.Fragment>
            )
        })}
    </ul>
     {show ?  <div className="form-container">
     <input value={updatecourseTitle} onChange={(e) => setUpdateCourseTitle(e.target.value)} className="form-input"/>
     <button  className="form-submit-btn" onClick={() => handleCourseUpdate1(id)}>Update</button>
    </div> : ""}
    </React.Fragment>
  )
}

export default CourseList