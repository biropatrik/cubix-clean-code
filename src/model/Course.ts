import { StudentAlreadyAddedException } from "../exception/StudentAlreadyAddedException";
import { Student } from "./Student";

export class Course {

    constructor(
        private name: string,
        private students: Student[] = []) { }

    public getName() {
        return this.name;
    }

    public addStudent(student: Student) {
        if (this.students.includes(student)) {
            throw new StudentAlreadyAddedException('Student already added to the course!');
        }
        this.students.push(student);
    }
}