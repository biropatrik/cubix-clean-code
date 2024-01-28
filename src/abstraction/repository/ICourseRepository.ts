import { Course } from "../../model/Course";
import { Student } from "../../model/Student";

export interface ICourseRepository {
    getCourseByName(name: string): Course | undefined;
    getAllCourses(): Course[];
    addCourse(course: Course): void;
    addStudentToCourse(student: Student, courseName: string): void;
}