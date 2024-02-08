import { create } from "zustand";
import {devtools, persist} from 'zustand/middleware'


const courseStore  = ((set) => ({
  courses:[],
  pending:[],
  complete:[],
  addCourse: (course) => {
         set((state) => ({
              courses:[course,...state.courses]
         }))
   },
   removeCourse: (courseId) => {
    set((state) => ({
      courses: state.courses.filter((c) => c.id !== courseId),
      pending: state.pending.filter((c) => c.id !== courseId),
      complete: state.complete.filter((c) => c.id !== courseId),
    }));
   },
   toggleCourseStatus: (courseId) => {
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === courseId ? { ...course, completed: !course.completed } : course
      ),
      pending: state.pending.map((course) =>
        course.id === courseId ? { ...course, completed: !course.completed } : course
      ),
      complete: state.complete.map((course) =>
        course.id === courseId ? { ...course, completed: !course.completed } : course
      ),
    }));
  },  
    updateCourse:(courseId,updatecourseTitle) => {
      set((state) => ({
        courses: state.courses.map((item) =>
          item.id === courseId ? { ...item, title: updatecourseTitle } : item
        ),
        pending: state.pending.map((item) =>
          item.id === courseId ? { ...item, title: updatecourseTitle } : item
        ),
        complete: state.complete.map((item) =>
          item.id === courseId ? { ...item, title: updatecourseTitle } : item
        ),
      }));
    }
}))


const useCourseStore = create(
  devtools(
      persist(courseStore, {
          name: "courses",
      })
  )
)


export default useCourseStore;