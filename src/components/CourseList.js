import React,{useState} from 'react'
import useCourseStore from '../app/courseStore'
import { Droppable,Draggable } from 'react-beautiful-dnd';

const CourseList = ({pending}) => {
  const [updatecourseTitle, setUpdateCourseTitle] = useState("");
  const [id,setId]  = useState("");
  const [show,setShow] = useState(false);

  const {courses, removeCourse, toggleCourseStatus,updateCourse} = useCourseStore(
        (state) => ({
            courses: state.courses,
            removeCourse: state.removeCourse,
            toggleCourseStatus: state.toggleCourseStatus,
            updateCourse:state.updateCourse,
        })
    )

     const handleCourseUpdate  =(id) => {
      const rt =  courses.filter((course) => course.id === id);
      setUpdateCourseTitle(rt[0].title);
      setId(rt[0].id)
      setShow(true);
      }
      const handleCourseUpdate1  =(id) =>  {
       updateCourse(id,updatecourseTitle);     
       setShow(false);
       setUpdateCourseTitle("");
      }

      console.log(courses)
  return (
    <React.Fragment>
        <div style={{display:'flex' ,width:"90%",backgroundColor:"blue",padding:"20px",height:"100vh",gap:"12px"}}>

            <Droppable droppableId="Active">
            {(provided, snapshot) => (
             <div 
             style={{
                     flex:"1",
                     backgroundColor:"red"
                 }}
                 ref={provided.innerRef}
               {...provided.droppableProps}
                 >
                  <h1 style={{textAlign:"center"}}>Active</h1>
                  <ul style={{padding:"12px"}}>
                     {courses.map((course, i) => {
                 return (
                    <Draggable draggableId={course.id.toString()} index={i}>
                         {(provided, snapshot) => (
                         <li
                         {...provided.draggableProps}
                         {...provided.dragHandleProps}
                         ref={provided.innerRef}
                         className={`course-item`}
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
                         )}
                     </Draggable>
                 )
                      })}  
                </ul>
            {provided.placeholder}
            </div>
            )}
            </Droppable>

            <Droppable droppableId="Pending">
            {(provided, snapshot) => (
                <div 
                ref={provided.innerRef}
            {...provided.droppableProps}
                style={{
                       flex:"1",
                        backgroundColor:"red"
                    }}>
                        
                        <h1 style={{textAlign:"center"}}>Pending</h1>
                        <ul style={{padding:"12px"}}>
                     {pending.map((course, i) => {
                 return (
                    <Draggable draggableId={course.id.toString()} index={i}>
                         {(provided, snapshot) => (
                         <li
                         {...provided.draggableProps}
                         {...provided.dragHandleProps}
                         ref={provided.innerRef}
                         className={`course-item`}
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
                         )}
                     </Draggable>
                 )
                      })}  
                </ul>
                        {provided.placeholder}
                    </div>
             )}
           
            </Droppable>

            <Droppable droppableId="Completed">
          {(provided, snapshot) => (
              <div 
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                   flex:"1",
                      backgroundColor:"red"
                  }}> 
                  <h1 style={{textAlign:"center"}}>Completed</h1>
                  {provided.placeholder}
                  </div>
          )}
          
            </Droppable>

        </div>
    
     {show ?  <div className="form-container">
     <input value={updatecourseTitle} onChange={(e) => setUpdateCourseTitle(e.target.value)} className="form-input"/>
     <button  className="form-submit-btn" onClick={() => handleCourseUpdate1(id)}>Update</button>
    </div> : ""}
    </React.Fragment>
  )
}

export default CourseList