import { Course } from "../../src/model/Course";
import { Lecturer } from "../../src/model/Lecturer"

describe('Lecturer tests', () => {
    it('should get the lecturer\'s name', () => {
        // Arrange
        const expectedName = 'Test';
        const lecturer = new Lecturer(expectedName);

        // Act
        const result = lecturer.getName();

        // Assert
        expect(result).toBe(expectedName);
    })

    it('should set the lecturer\'s name', () => {
        // Arrange
        const expectedName = 'Test';
        const lecturer = new Lecturer('John');

        // Act
        lecturer.setName(expectedName);
        const result = lecturer.getName();

        // Assert
        expect(result).toBe(expectedName);
    })

    it('should get the lecturer\'s all courses', () => {
        // Arrange
        const expectedCourses = [new Course('Test_1'), new Course('Test_2')];
        const lecturer = new Lecturer('John', expectedCourses);

        // Act
        const result = lecturer.getAllCourses();

        // Assert
        expect(result).toBe(expectedCourses);
    })

    it('should add new course', () => {
        // Arrange
        const course = new Course('Test_1');
        const newCourse = new Course('Test_2')
        const expectedCourses = [course, newCourse];
        const lecturer = new Lecturer('John', [course]);

        // Act
        lecturer.addCourse(newCourse);
        const result = lecturer.getAllCourses();

        // Assert
        expect(result).toStrictEqual(expectedCourses);
    })
})