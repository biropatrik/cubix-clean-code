export class CourseAlreadyAddedException extends Error {
    public constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}