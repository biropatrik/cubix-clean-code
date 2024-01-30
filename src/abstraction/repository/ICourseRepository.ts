import { Course } from "../../model/Course";
import { CourseStatistic } from "../../model/CourseStatistic";
import { Student } from "../../model/Student";

export interface ICourseRepository {
    getCourseByName(name: string): Promise<Course | undefined>;
    getAllCourses(): Promise<Course[]>;
    addCourse(course: Course): Promise<void>;
    addStudentToCourse(student: Student, courseName: string): Promise<void>;
    getCourseStatistics(courseName: string): Promise<CourseStatistic>;
}