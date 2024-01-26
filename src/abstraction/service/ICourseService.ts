import { Course } from "../../model/Course";

export interface ICourseService {
    getCourseByName(name: string): Course;
    getAllCourses(): Course[];
    addCourse(course: Course): void;
}