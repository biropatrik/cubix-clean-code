import { Course } from "./Course";

export abstract class Person {

    constructor(
        private name: string,
        private courses: Course[] = []) { }

    public getName() {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getAllCourses() {
        return this.courses;
    }

    public addCourse(course: Course) {
        this.courses.push(course);
    }
}