import { Course } from "../../model/Course";

export interface ICourseRepository {
    getCourseByName(name: string): Course | undefined;
    getAllCourses(): Course[];
    addCourse(course: Course): void;
}