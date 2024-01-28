import { CourseRepository } from "../src/repository/CourseRepository";
import { DbClient } from "../src/client/DbClient";
import { mock, mockReset } from "jest-mock-extended";
import { Course } from "../src/model/Course";
import { Student } from "../src/model/Student";
import { NetworkException } from "../src/exception/NetworkException";
import { UnknownException } from "../src/exception/UnknownException";

describe('CourseRepository tests', () => {
    let courseRepository: CourseRepository;
    const mockDbClient = mock<DbClient>();

    beforeEach(() => {
        mockReset(mockDbClient);
        courseRepository = new CourseRepository(mockDbClient);
    })

    describe('Happy paths', () => {
        it('should return a course by name', () => {
            // Arrange
            const courseName = 'Test';
            const course = new Course(courseName);
            mockDbClient.getCourseByName.mockReturnValue(course);

            // Act
            const result = courseRepository.getCourseByName(courseName);

            // Assert
            expect(mockDbClient.getCourseByName).toHaveBeenCalledTimes(1);
            expect(mockDbClient.getCourseByName).toHaveBeenCalledWith(courseName);
            expect(result).toMatchSnapshot();
        })

        it('should return all courses', () => {
            // Arrange
            const courses = [new Course('Java'), new Course('SQL'), new Course('Docker')];
            mockDbClient.getAllCourses.mockReturnValue(courses);

            // Act
            const result = courseRepository.getAllCourses();

            // Assert
            expect(mockDbClient.getAllCourses).toHaveBeenCalledTimes(1);
            expect(mockDbClient.getAllCourses).toHaveBeenCalledWith();
            expect(result).toMatchSnapshot();
        })

        it('should add new course', () => {
            // Arrange
            const course = new Course('Test');

            // Act
            courseRepository.addCourse(course);

            // Assert
            expect(mockDbClient.addCourse).toHaveBeenCalledTimes(1);
            expect(mockDbClient.addCourse).toHaveBeenCalledWith(course);
        })

        it('should add new student to a course', () => {
            // Arrange
            const courseName = 'Test';
            const student = new Student('John');

            // Act
            courseRepository.addStudentToCourse(student, courseName);

            // Assert
            expect(mockDbClient.addStudentToCourse).toHaveBeenCalledTimes(1);
            expect(mockDbClient.addStudentToCourse).toHaveBeenCalledWith(student, courseName);
        })
    })

    describe('Error paths', () => {
        it('should throw an network exception when call getCourseByName', () => {
            // Arrange
            const courseName = 'Test';
            const exception = new NetworkException('Network error');
            mockDbClient.getCourseByName.mockImplementation(() => { throw exception });

            // Act and assert
            expect(() => courseRepository.getCourseByName(courseName)).toThrow(exception);
            expect(mockDbClient.getCourseByName).toHaveBeenCalledTimes(1);
            expect(mockDbClient.getCourseByName).toHaveBeenCalledWith(courseName);
        })

        it('should throw an unknown exception when call getCourseByName', () => {
            // Arrange
            const courseName = 'Test';
            const exception = new Error('error');
            const expectedException = new UnknownException('Unknown error happened.');
            mockDbClient.getCourseByName.mockImplementation(() => { throw exception });

            // Act and assert
            expect(() => courseRepository.getCourseByName(courseName)).toThrow(expectedException);
            expect(mockDbClient.getCourseByName).toHaveBeenCalledTimes(1);
            expect(mockDbClient.getCourseByName).toHaveBeenCalledWith(courseName);
        })

        it('should throw an network exception when call getAllCourses', () => {
            // Arrange
            const exception = new NetworkException('Network error');
            mockDbClient.getAllCourses.mockImplementation(() => { throw exception });

            // Act and assert
            expect(() => courseRepository.getAllCourses()).toThrow(exception);
            expect(mockDbClient.getAllCourses).toHaveBeenCalledTimes(1);
            expect(mockDbClient.getAllCourses).toHaveBeenCalledWith();
        })

        it('should throw an unknown exception when call getAllCourses', () => {
            // Arrange
            const exception = new Error('error');
            const expectedException = new UnknownException('Unknown error happened.');
            mockDbClient.getAllCourses.mockImplementation(() => { throw exception });

            // Act and assert
            expect(() => courseRepository.getAllCourses()).toThrow(expectedException);
            expect(mockDbClient.getAllCourses).toHaveBeenCalledTimes(1);
            expect(mockDbClient.getAllCourses).toHaveBeenCalledWith();
        })

        it('should throw an network exception when call addCourse', () => {
            // Arrange
            const course = new Course('Test');
            const exception = new NetworkException('Network error');
            mockDbClient.addCourse.mockImplementation(() => { throw exception });

            // Act and assert
            expect(() => courseRepository.addCourse(course)).toThrow(exception);
            expect(mockDbClient.addCourse).toHaveBeenCalledTimes(1);
            expect(mockDbClient.addCourse).toHaveBeenCalledWith(course);
        })

        it('should throw an unknown exception when call addCourse', () => {
            // Arrange
            const course = new Course('Test');
            const exception = new Error('error');
            const expectedException = new UnknownException('Unknown error happened.');
            mockDbClient.addCourse.mockImplementation(() => { throw exception });

            // Act and assert
            expect(() => courseRepository.addCourse(course)).toThrow(expectedException);
            expect(mockDbClient.addCourse).toHaveBeenCalledTimes(1);
            expect(mockDbClient.addCourse).toHaveBeenCalledWith(course);
        })

        it('should throw an network exception when call addStudentToCourse', () => {
            // Arrange
            const courseName = 'Test';
            const student = new Student('John');
            const exception = new NetworkException('Network error');
            mockDbClient.addStudentToCourse.mockImplementation(() => { throw exception });

            // Act and assert
            expect(() => courseRepository.addStudentToCourse(student, courseName)).toThrow(exception);
            expect(mockDbClient.addStudentToCourse).toHaveBeenCalledTimes(1);
            expect(mockDbClient.addStudentToCourse).toHaveBeenCalledWith(student, courseName);
        })

        it('should throw an unknown exception when call addStudentToCourse', () => {
            // Arrange
            const courseName = 'Test';
            const student = new Student('John');
            const exception = new Error('error');
            const expectedException = new UnknownException('Unknown error happened.');
            mockDbClient.addStudentToCourse.mockImplementation(() => { throw exception });

            // Act and assert
            expect(() => courseRepository.addStudentToCourse(student, courseName)).toThrow(expectedException);
            expect(mockDbClient.addStudentToCourse).toHaveBeenCalledTimes(1);
            expect(mockDbClient.addStudentToCourse).toHaveBeenCalledWith(student, courseName);
        })
    })
})