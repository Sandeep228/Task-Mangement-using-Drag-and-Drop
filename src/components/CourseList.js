import React from 'react'
import useCourseStore from '../app/courseStore'
import Course from './Course';

const CourseList = () => {

  const {courses,pending,complete} = useCourseStore(
        (state) => ({
            courses: state.courses,
            pending:state.pending,
            complete:state.complete,
        })
    )
    
  return (
    <React.Fragment>
        <div style={{display:'flex' ,width:"90%",backgroundColor:"blue",padding:"20px",height:"100vh",gap:"12px"}}>
             <Course droppableId="Active" value="courses" items={courses} />
            <Course droppableId="Pending" value="pending" items={pending} />
            <Course droppableId="Completed" value="Completed" items={complete} />
        </div>

    </React.Fragment>
  )
}

export default CourseList