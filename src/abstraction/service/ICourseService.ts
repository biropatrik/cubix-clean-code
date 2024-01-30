import { Course } from "../../model/Course";
import { CourseStatistic } from "../../model/CourseStatistic";
import { Student } from "../../model/Student";

export interface ICourseService {
    getCourseByName(name: string): Promise<Course>;
    getAllCourses(): Promise<Course[]>;
    addCourse(course: Course): Promise<void>;
    addStudentToCourse(student: Student, courseName: string): Promise<void>;
    getCourseStatistics(courseName: string): Promise<CourseStatistic>;
}