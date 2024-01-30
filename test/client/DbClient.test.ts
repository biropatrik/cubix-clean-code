import { DbClient } from "../../src/client/DbClient"
import { Course } from "../../src/model/Course";
import { Student } from "../../src/model/Student";

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

    it('should return all courses', async () => {
        // Act
        const result = await dbClient.getAllCourses();

        // Assert
        expect(result).toMatchSnapshot();
        expect(result).toHaveLength(3);
    })

    it('should add new course', async () => {
        // Arrange
        const newCourse = new Course('Power BI');

        // Act
        dbClient.addCourse(newCourse);
        const result = await dbClient.getAllCourses();

        // Assert
        expect(result).toMatchSnapshot();
        expect(result).toHaveLength(4);
    })

    it('should add student to a course', async () => {
        // Arrange
        const courseName = 'Java';
        const student = new Student('John');

        // Act
        dbClient.addStudentToCourse(student, courseName);
        const result = await dbClient.getCourseByName(courseName);

        // Assert
        expect(result).toMatchSnapshot();
    })

    it('should get course statistics', async () => {
        // Arrange
        const courseName = 'Java';

        // Act
        const result = await dbClient.getCourseStatistics(courseName);

        // Assert
        expect(result).toMatchSnapshot();
    })
})