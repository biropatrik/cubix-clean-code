import { Course } from "./Course";
import { Person } from "./Person";

export class Student extends Person {

    constructor(name: string, courses?: Course[]) {
        super(name, courses);
    }
}