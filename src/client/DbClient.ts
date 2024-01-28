import { IDbClient } from "../abstraction/client/IDbClient";
import { Course } from "../model/Course";
import { Student } from "../model/Student";

export class DbClient implements IDbClient {

    private courses: Course[] = [new Course('Data Analytics'), new Course('Project Management'), new Course('Java')]

    getCourseByName(name: string): Course | undefined {
        let result = undefined;
        for (const course of this.courses) {
            if (course.getName() === name) {
                result = course;
            }
        }
        return result;
    }

    getAllCourses(): Course[] {
        return this.courses;
    }

    addCourse(course: Course): void {
        this.courses.push(course);
    }

    addStudentToCourse(student: Student, courseName: string): void {
        for (const course of this.courses) {
            if (course.getName() === courseName) {
                course.addStudent(student);
            }
        }
    }
}