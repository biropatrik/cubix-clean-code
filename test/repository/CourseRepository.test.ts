import { CourseRepository } from "../../src/repository/CourseRepository";
import { DbClient } from "../../src/client/DbClient";
import { mock, mockReset } from "jest-mock-extended";
import { Course } from "../../src/model/Course";
import { Student } from "../../src/model/Student";
import { NetworkException } from "../../src/exception/NetworkException";
import { UnknownException } from "../../src/exception/UnknownException";
import { CourseStatistic } from "../../src/model/CourseStatistic";

describe('CourseRepository tests', () => {
    let courseRepository: CourseRepository;
    const mockDbClient = mock<DbClient>();

    beforeEach(() => {
        mockReset(mockDbClient);
        courseRepository = new CourseRepository(mockDbClient);
    })

    describe('Happy paths', () => {
        it('should return a course by name', async () => {
            // Arrange
            const courseName = 'Test';
            const expectedCourse = new Course(courseName);
            mockDbClient.getCourseByName.mockReturnValue(Promise.resolve(expectedCourse));

            // Act
            const result = await courseRepository.getCourseByName(courseName);

            // Assert
            expect(mockDbClient.getCourseByName).toHaveBeenCalledTimes(1);
            expect(mockDbClient.getCourseByName).toHaveBeenCalledWith(courseName);
            expect(result).toBe(expectedCourse);
        })

        it('should return all courses', async () => {
            // Arrange
            const expectedCourses = [new Course('Java'), new Course('SQL'), new Course('Docker')];
            mockDbClient.getAllCourses.mockReturnValue(Promise.resolve(expectedCourses));

            // Act
            const result = await courseRepository.getAllCourses();

            // Assert
            expect(mockDbClient.getAllCourses).toHaveBeenCalledTimes(1);
            expect(mockDbClient.getAllCourses).toHaveBeenCalledWith();
            expect(result).toBe(expectedCourses);
        })

        it('should add new course', async () => {
            // Arrange
            const course = new Course('Test');

            // Act
            await courseRepository.addCourse(course);

            // Assert
            expect(mockDbClient.addCourse).toHaveBeenCalledTimes(1);
            expect(mockDbClient.addCourse).toHaveBeenCalledWith(course);
        })

        it('should add new student to a course', async () => {
            // Arrange
            const courseName = 'Test';
            const student = new Student('John');

            // Act
            await courseRepository.addStudentToCourse(student, courseName);

            // Assert
            expect(mockDbClient.addStudentToCourse).toHaveBeenCalledTimes(1);
            expect(mockDbClient.addStudentToCourse).toHaveBeenCalledWith(student, courseName);
        })

        it('should get a course statistics', async () => {
            // Arrange
            const courseName = 'Test';
            const expectedCourseStatistic = new CourseStatistic('Java', 5, 2, 70, new Date('2023-12-12'));
            mockDbClient.getCourseStatistics.mockReturnValue(Promise.resolve(expectedCourseStatistic));

            // Act
            const result = await courseRepository.getCourseStatistics(courseName);

            // Assert
            expect(mockDbClient.getCourseStatistics).toHaveBeenCalledTimes(1);
            expect(mockDbClient.getCourseStatistics).toHaveBeenCalledWith(courseName);
            expect(result).toBe(expectedCourseStatistic);
        })
    })

    describe('Error paths', () => {
        it('should throw a network exception when call getCourseByName', async () => {
            // Arrange
            const courseName = 'Test';
            const exception = new NetworkException('Network error');
            mockDbClient.getCourseByName.mockImplementation(() => { throw exception });

            // Act and assert
            await expect(() => courseRepository.getCourseByName(courseName)).rejects.toThrow(exception);
            expect(mockDbClient.getCourseByName).toHaveBeenCalledTimes(1);
            expect(mockDbClient.getCourseByName).toHaveBeenCalledWith(courseName);
        })

        it('should throw an unknown exception when call getCourseByName', async () => {
            // Arrange
            const courseName = 'Test';
            const exception = new Error('error');
            const expectedException = new UnknownException('Unknown error happened.');
            mockDbClient.getCourseByName.mockImplementation(() => { throw exception });

            // Act and assert
            await expect(() => courseRepository.getCourseByName(courseName)).rejects.toThrow(expectedException);
            expect(mockDbClient.getCourseByName).toHaveBeenCalledTimes(1);
            expect(mockDbClient.getCourseByName).toHaveBeenCalledWith(courseName);
        })

        it('should throw a network exception when call getAllCourses', async () => {
            // Arrange
            const exception = new NetworkException('Network error');
            mockDbClient.getAllCourses.mockImplementation(() => { throw exception });

            // Act and assert
            await expect(() => courseRepository.getAllCourses()).rejects.toThrow(exception);
            expect(mockDbClient.getAllCourses).toHaveBeenCalledTimes(1);
            expect(mockDbClient.getAllCourses).toHaveBeenCalledWith();
        })

        it('should throw an unknown exception when call getAllCourses', async () => {
            // Arrange
            const exception = new Error('error');
            const expectedException = new UnknownException('Unknown error happened.');
            mockDbClient.getAllCourses.mockImplementation(() => { throw exception });

            // Act and assert
            await expect(() => courseRepository.getAllCourses()).rejects.toThrow(expectedException);
            expect(mockDbClient.getAllCourses).toHaveBeenCalledTimes(1);
            expect(mockDbClient.getAllCourses).toHaveBeenCalledWith();
        })

        it('should throw a network exception when call addCourse', async () => {
            // Arrange
            const course = new Course('Test');
            const exception = new NetworkException('Network error');
            mockDbClient.addCourse.mockImplementation(() => { throw exception });

            // Act and assert
            await expect(() => courseRepository.addCourse(course)).rejects.toThrow(exception);
            expect(mockDbClient.addCourse).toHaveBeenCalledTimes(1);
            expect(mockDbClient.addCourse).toHaveBeenCalledWith(course);
        })

        it('should throw an unknown exception when call addCourse', async () => {
            // Arrange
            const course = new Course('Test');
            const exception = new Error('error');
            const expectedException = new UnknownException('Unknown error happened.');
            mockDbClient.addCourse.mockImplementation(() => { throw exception });

            // Act and assert
            await expect(() => courseRepository.addCourse(course)).rejects.toThrow(expectedException);
            expect(mockDbClient.addCourse).toHaveBeenCalledTimes(1);
            expect(mockDbClient.addCourse).toHaveBeenCalledWith(course);
        })

        it('should throw a network exception when call addStudentToCourse', async () => {
            // Arrange
            const courseName = 'Test';
            const student = new Student('John');
            const exception = new NetworkException('Network error');
            mockDbClient.addStudentToCourse.mockImplementation(() => { throw exception });

            // Act and assert
            await expect(() => courseRepository.addStudentToCourse(student, courseName)).rejects.toThrow(exception);
            expect(mockDbClient.addStudentToCourse).toHaveBeenCalledTimes(1);
            expect(mockDbClient.addStudentToCourse).toHaveBeenCalledWith(student, courseName);
        })

        it('should throw an unknown exception when call addStudentToCourse', async () => {
            // Arrange
            const courseName = 'Test';
            const student = new Student('John');
            const exception = new Error('error');
            const expectedException = new UnknownException('Unknown error happened.');
            mockDbClient.addStudentToCourse.mockImplementation(() => { throw exception });

            // Act and assert
            await expect(() => courseRepository.addStudentToCourse(student, courseName)).rejects.toThrow(expectedException);
            expect(mockDbClient.addStudentToCourse).toHaveBeenCalledTimes(1);
            expect(mockDbClient.addStudentToCourse).toHaveBeenCalledWith(student, courseName);
        })

        it('should throw a network exception when call getCourseStatistics', async () => {
            // Arrange
            const courseName = 'Test';
            const exception = new NetworkException('Network error');
            mockDbClient.getCourseStatistics.mockImplementation(() => { throw exception });

            // Act and assert
            await expect(() => courseRepository.getCourseStatistics(courseName)).rejects.toThrow(exception);
            expect(mockDbClient.getCourseStatistics).toHaveBeenCalledTimes(1);
            expect(mockDbClient.getCourseStatistics).toHaveBeenCalledWith(courseName);
        })

        it('should throw an unknown exception when call getCourseStatistics', async () => {
            // Arrange
            const courseName = 'Test';
            const exception = new Error('error');
            const expectedException = new UnknownException('Unknown error happened.');
            mockDbClient.getCourseStatistics.mockImplementation(() => { throw exception });

            // Act and assert
            await expect(() => courseRepository.getCourseStatistics(courseName)).rejects.toThrow(expectedException);
            expect(mockDbClient.getCourseStatistics).toHaveBeenCalledTimes(1);
            expect(mockDbClient.getCourseStatistics).toHaveBeenCalledWith(courseName);
        })
    })
})