import { IDbClient } from "../abstraction/client/IDbClient";
import { ICourseRepository } from "../abstraction/repository/ICourseRepository";
import { NetworkException } from "../exception/NetworkException";
import { UnknownException } from "../exception/UnknownException";
import { Course } from "../model/Course";
import { CourseStatistic } from "../model/CourseStatistic";
import { Student } from "../model/Student";

export class CourseRepository implements ICourseRepository {

    constructor(private dbClient: IDbClient) { }

    async getCourseByName(name: string): Promise<Course | undefined> {
        try {
            return await this.dbClient.getCourseByName(name);
        } catch (error) {
            if (error instanceof NetworkException) {
                throw error;
            }
            throw new UnknownException('Unknown error happened.');
        }
    }

    async getAllCourses(): Promise<Course[]> {
        try {
            return await this.dbClient.getAllCourses();
        } catch (error) {
            if (error instanceof NetworkException) {
                throw error;
            }
            throw new UnknownException('Unknown error happened.');
        }
    }

    async addCourse(course: Course): Promise<void> {
        try {
            await this.dbClient.addCourse(course);
        } catch (error) {
            if (error instanceof NetworkException) {
                throw error;
            }
            throw new UnknownException('Unknown error happened.');
        }
    }

    async addStudentToCourse(student: Student, courseName: string): Promise<void> {
        try {
            await this.dbClient.addStudentToCourse(student, courseName);
        } catch (error) {
            if (error instanceof NetworkException) {
                throw error;
            }
            throw new UnknownException('Unknown error happened.');
        }
    }

    async getCourseStatistics(courseName: string): Promise<CourseStatistic> {
        try {
            return await this.dbClient.getCourseStatistics(courseName);
        } catch (error) {
            if (error instanceof NetworkException) {
                throw error;
            }
            throw new UnknownException('Unknown error happened.');
        }
    }
}