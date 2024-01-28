import { Course } from "../../model/Course";
import { Student } from "../../model/Student";

export interface ICourseService {
    getCourseByName(name: string): Course;
    getAllCourses(): Course[];
    addCourse(course: Course): void;
    addStudentToCourse(student: Student, courseName: string): void;
}