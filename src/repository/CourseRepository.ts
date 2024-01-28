import { IDbClient } from "../abstraction/client/IDbClient";
import { ICourseRepository } from "../abstraction/repository/ICourseRepository";
import { NetworkException } from "../exception/NetworkException";
import { UnknownException } from "../exception/UnknownException";
import { Course } from "../model/Course";
import { Student } from "../model/Student";

export class CourseRepository implements ICourseRepository {

    constructor(private dbClient: IDbClient) { }

    getCourseByName(name: string): Course | undefined {
        try {
            return this.dbClient.getCourseByName(name);
        } catch (error) {
            if (error instanceof NetworkException) {
                throw error;
            }
            throw new UnknownException('Unknown error happened.');
        }
    }

    getAllCourses(): Course[] {
        try {
            return this.dbClient.getAllCourses();
        } catch (error) {
            if (error instanceof NetworkException) {
                throw error;
            }
            throw new UnknownException('Unknown error happened.');
        }
    }

    addCourse(course: Course): void {
        try {
            this.dbClient.addCourse(course);
        } catch (error) {
            if (error instanceof NetworkException) {
                throw error;
            }
            throw new UnknownException('Unknown error happened.');
        }
    }

    addStudentToCourse(student: Student, courseName: string): void {
        try {
            this.dbClient.addStudentToCourse(student, courseName);
        } catch (error) {
            if (error instanceof NetworkException) {
                throw error;
            }
            throw new UnknownException('Unknown error happened.');
        }
    }
}