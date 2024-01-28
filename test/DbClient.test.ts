import { DbClient } from "../src/client/DbClient"
import { Course } from "../src/model/Course";
import { Student } from "../src/model/Student";

describe('DbClient tests', () => {
    let dbClient: DbClient;

    beforeEach(() => {
        dbClient = new DbClient();
    })

    it('should return a course by name', () => {
        // Arrange
        const courseName = 'Java';

        // Act
        const result = dbClient.getCourseByName(courseName);

        // Assert
        expect(result).toMatchSnapshot();
    })

    it('should return all courses', () => {
        // Act
        const result = dbClient.getAllCourses();

        // Assert
        expect(result).toMatchSnapshot();
        expect(result).toHaveLength(3);
    })

    it('should add new course', () => {
        // Arrange
        const newCourse = new Course('Power BI');

        // Act
        dbClient.addCourse(newCourse);
        const result = dbClient.getAllCourses();

        // Assert
        expect(result).toMatchSnapshot();
        expect(result).toHaveLength(4);
    })

    it('should add student to a course', () => {
        // Arrange
        const courseName = 'Java';
        const student = new Student('John');
        const expectedCourse = new Course(courseName, [student]);

        // Act
        dbClient.addStudentToCourse(student, courseName);
        const result = dbClient.getCourseByName(courseName);

        // Assert
        expect(result).toEqual(expectedCourse);
    })
})