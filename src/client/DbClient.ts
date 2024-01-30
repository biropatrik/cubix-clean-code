import { IDbClient } from "../abstraction/client/IDbClient";
import { Course } from "../model/Course";
import { CourseStatistic } from "../model/CourseStatistic";
import { Student } from "../model/Student";

export class DbClient implements IDbClient {

    private courses: Course[] = [new Course('Data Analytics'), new Course('Project Management'), new Course('Java')];
    private courseStatistic = new CourseStatistic('Java', 5, 2, 70, new Date('2023-12-12'));

    async getCourseByName(name: string): Promise<Course | undefined> {
        let result = undefined;
        for (const course of this.courses) {
            if (course.getName() === name) {
                result = course;
            }
        }
        return result;
    }

    async getAllCourses(): Promise<Course[]> {
        return this.courses;
    }

    async addCourse(course: Course): Promise<void> {
        this.courses.push(course);
    }

    async addStudentToCourse(student: Student, courseName: string): Promise<void> {
        for (const course of this.courses) {
            if (course.getName() === courseName) {
                course.addStudent(student);
            }
        }
    }

    async getCourseStatistics(courseName: string): Promise<CourseStatistic> {
        return this.courseStatistic;
    }
}