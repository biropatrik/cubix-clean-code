import { ICourseRepository } from "../src/abstraction/repository/ICourseRepository";
import { INotificationService } from "../src/abstraction/service/INotificationService";
import { IPaymentService } from "../src/abstraction/service/IPaymentService";
import { CourseService } from "../src/service/CourseService";
import { Course } from "../src/model/Course";
import { CourseNotFoundException } from "../src/exception/CourseNotFoundException";
import { mock, mockReset } from 'jest-mock-extended';
import { CourseAlreadyAddedException } from "../src/exception/CourseAlreadyAddedException";

describe('CourseService tests', () => {
    let courseService: CourseService;
    const mockCourseRepository = mock<ICourseRepository>();
    const mockPaymentService = mock<IPaymentService>();
    const mockNotificationService = mock<INotificationService>();

    beforeEach(() => {
        mockReset(mockCourseRepository);
        mockReset(mockPaymentService);
        mockReset(mockNotificationService);

        courseService = new CourseService(mockCourseRepository, mockPaymentService, mockNotificationService);
    })

    describe('Happy paths', () => {
        it('should get 1 course by name', () => {
            // Arrange
            const name = 'test';
            const expectedCourse = new Course(name);
            mockCourseRepository.getCourseByName.mockReturnValue(expectedCourse);

            // Act
            const result = courseService.getCourseByName(name);

            // Arrange
            expect(mockCourseRepository.getCourseByName).toHaveBeenCalledTimes(1);
            expect(mockCourseRepository.getCourseByName).toHaveBeenCalledWith(name);
            expect(result).toBe(expectedCourse);
        })

        it('should get all courses when called getAllCourses', () => {
            // Arrange
            const courses: Course[] = [new Course('Test_1'), new Course('Test_2'), new Course('Test_3')];
            mockCourseRepository.getAllCourses.mockReturnValue(courses);

            // Act
            const result = courseService.getAllCourses();

            // Arrange
            expect(mockCourseRepository.getAllCourses).toHaveBeenCalledTimes(1);
            expect(mockCourseRepository.getAllCourses).toHaveBeenCalledWith();
            expect(result).toBe(courses);
        })

        it('should receive zero courses when called getAllCourses', () => {
            // Arrange
            const courses: Course[] = [];
            mockCourseRepository.getAllCourses.mockReturnValue(courses);

            // Act
            const result = courseService.getAllCourses();

            // Arrange
            expect(mockCourseRepository.getAllCourses).toHaveBeenCalledTimes(1);
            expect(mockCourseRepository.getAllCourses).toHaveBeenCalledWith();
            expect(result).toBe(courses);
        })

        it('should add a course', () => {
            // Arrange
            const name = 'Test';
            const newCourse = new Course(name);
            mockCourseRepository.getCourseByName.mockReturnValue(undefined);

            // Act
            courseService.addCourse(newCourse);

            // Arrange
            expect(mockCourseRepository.addCourse).toHaveBeenCalledTimes(1);
            expect(mockCourseRepository.addCourse).toHaveBeenCalledWith(newCourse);
            expect(mockCourseRepository.getCourseByName).toHaveBeenCalledTimes(1);
            expect(mockCourseRepository.getCourseByName).toHaveBeenCalledWith(name);
        })
    })

    describe('Error paths', () => {
        it('should get an exception when called getCourseByName', () => {
            // Arrange
            const name = 'test';
            const exception = new CourseNotFoundException('Course not found with name: ' + name);
            mockCourseRepository.getCourseByName.mockReturnValue(undefined);

            // Act and assert
            expect(() => courseService.getCourseByName(name)).toThrow(exception);
            expect(mockCourseRepository.getCourseByName).toHaveBeenCalledTimes(1);
            expect(mockCourseRepository.getCourseByName).toHaveBeenCalledWith(name);
        })

        it('should get an exception if addCourse is called with a course already added', () => {
            // Arrange
            const name = 'Test';
            const newCourse = new Course(name);
            const exception = new CourseAlreadyAddedException('Course already added!');
            mockCourseRepository.getCourseByName.mockReturnValue(newCourse);

            // Act and Arrange
            expect(() => courseService.addCourse(newCourse)).toThrow(exception);
            expect(mockCourseRepository.addCourse).toHaveBeenCalledTimes(0);
            expect(mockCourseRepository.getCourseByName).toHaveBeenCalledTimes(1);
            expect(mockCourseRepository.getCourseByName).toHaveBeenCalledWith(name);
        })
    })
})