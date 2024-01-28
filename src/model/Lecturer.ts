import { Course } from "./Course";
import { Person } from "./Person";

export class Lecturer extends Person {

    constructor(name: string, courses?: Course[]) {
        super(name, courses);
    }
}