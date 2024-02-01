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
        it.each`
        testName | exception | expectedException
        ${'network exception'} | ${new NetworkException('Network error')} | ${new NetworkException('Network error')}
        ${'unknown exception'} | ${new Error('error')} | ${new UnknownException('Unknown error happened.')}
        `('should throw a(n) $testName when call getCourseByName', async ({ exception, expectedException }) => {
            // Arrange
            const courseName = 'Test';
            mockDbClient.getCourseByName.mockImplementation(() => { throw exception });

            // Act and assert
            await expect(() => courseRepository.getCourseByName(courseName)).rejects.toThrow(expectedException);
            expect(mockDbClient.getCourseByName).toHaveBeenCalledTimes(1);
            expect(mockDbClient.getCourseByName).toHaveBeenCalledWith(courseName);
        })

        it.each`
        testName | exception | expectedException
        ${'network exception'} | ${new NetworkException('Network error')} | ${new NetworkException('Network error')}
        ${'unknown exception'} | ${new Error('error')} | ${new UnknownException('Unknown error happened.')}
        `('should throw a(n) $testName when call getAllCourses', async ({ exception, expectedException }) => {
            // Arrange
            mockDbClient.getAllCourses.mockImplementation(() => { throw exception });

            // Act and assert
            await expect(() => courseRepository.getAllCourses()).rejects.toThrow(expectedException);
            expect(mockDbClient.getAllCourses).toHaveBeenCalledTimes(1);
            expect(mockDbClient.getAllCourses).toHaveBeenCalledWith();
        })

        it.each`
        testName | exception | expectedException
        ${'network exception'} | ${new NetworkException('Network error')} | ${new NetworkException('Network error')}
        ${'unknown exception'} | ${new Error('error')} | ${new UnknownException('Unknown error happened.')}
        `('should throw a(n) $testName when call addCourse', async ({ exception, expectedException }) => {
            // Arrange
            const course = new Course('Test');
            mockDbClient.addCourse.mockImplementation(() => { throw exception });

            // Act and assert
            await expect(() => courseRepository.addCourse(course)).rejects.toThrow(expectedException);
            expect(mockDbClient.addCourse).toHaveBeenCalledTimes(1);
            expect(mockDbClient.addCourse).toHaveBeenCalledWith(course);
        })

        it.each`
        testName | exception | expectedException
        ${'network exception'} | ${new NetworkException('Network error')} | ${new NetworkException('Network error')}
        ${'unknown exception'} | ${new Error('error')} | ${new UnknownException('Unknown error happened.')}
        `('should throw a(n) $testName when call addStudentToCourse', async ({ exception, expectedException }) => {
            // Arrange
            const courseName = 'Test';
            const student = new Student('John');
            mockDbClient.addStudentToCourse.mockImplementation(() => { throw exception });

            // Act and assert
            await expect(() => courseRepository.addStudentToCourse(student, courseName)).rejects.toThrow(expectedException);
            expect(mockDbClient.addStudentToCourse).toHaveBeenCalledTimes(1);
            expect(mockDbClient.addStudentToCourse).toHaveBeenCalledWith(student, courseName);
        })

        it.each`
        testName | exception | expectedException
        ${'network exception'} | ${new NetworkException('Network error')} | ${new NetworkException('Network error')}
        ${'unknown exception'} | ${new Error('error')} | ${new UnknownException('Unknown error happened.')}
        `('should throw a(n) $testName when call getCourseStatistics', async ({ exception, expectedException }) => {
            // Arrange
            const courseName = 'Test';
            mockDbClient.getCourseStatistics.mockImplementation(() => { throw exception });

            // Act and assert
            await expect(() => courseRepository.getCourseStatistics(courseName)).rejects.toThrow(expectedException);
            expect(mockDbClient.getCourseStatistics).toHaveBeenCalledTimes(1);
            expect(mockDbClient.getCourseStatistics).toHaveBeenCalledWith(courseName);
        })
    })
})