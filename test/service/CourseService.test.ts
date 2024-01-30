import { ICourseRepository } from "../../src/abstraction/repository/ICourseRepository";
import { IPaymentService } from "../../src/abstraction/service/IPaymentService";
import { CourseService } from "../../src/service/CourseService";
import { Course } from "../../src/model/Course";
import { Student } from "../../src/model/Student";
import { mock, mockReset } from 'jest-mock-extended';
import { CourseNotFoundException } from "../../src/exception/CourseNotFoundException";
import { CourseAlreadyAddedException } from "../../src/exception/CourseAlreadyAddedException";
import { StudentAlreadyAddedException } from "../../src/exception/StudentAlreadyAddedException";
import { CourseNotPaidException } from "../../src/exception/CourseNotPaidException";
import { INotificationService } from "../../src/abstraction/service/INotificationService";
import { EmailClient } from "../../src/client/EmailClient";
import { NotificationService } from "../../src/service/NotificationService";

describe('CourseService tests', () => {
    let courseService: CourseService;
    const mockCourseRepository = mock<ICourseRepository>();
    const mockPaymentService = mock<IPaymentService>();
    const mockNotificationService = mock<INotificationService>();

    let notificationService: NotificationService;
    let emailClient: EmailClient;

    beforeEach(() => {
        mockReset(mockCourseRepository);
        mockReset(mockPaymentService);
        mockReset(mockNotificationService);

        emailClient = new EmailClient();
        notificationService = new NotificationService([emailClient]);

        courseService = new CourseService(mockCourseRepository, mockPaymentService, notificationService);
    })

    describe('Happy paths', () => {
        it('should get 1 course by name', async () => {
            // Arrange
            const name = 'test';
            const expectedCourse = new Course(name);
            mockCourseRepository.getCourseByName.mockReturnValue(Promise.resolve(expectedCourse));

            // Act
            const result = await courseService.getCourseByName(name);

            // Arrange
            expect(mockCourseRepository.getCourseByName).toHaveBeenCalledTimes(1);
            expect(mockCourseRepository.getCourseByName).toHaveBeenCalledWith(name);
            expect(result).toBe(expectedCourse);
        })

        it('should get all courses when called getAllCourses', async () => {
            // Arrange
            const courses: Course[] = [new Course('Test_1'), new Course('Test_2'), new Course('Test_3')];
            mockCourseRepository.getAllCourses.mockReturnValue(Promise.resolve(courses));

            // Act
            const result = await courseService.getAllCourses();

            // Arrange
            expect(mockCourseRepository.getAllCourses).toHaveBeenCalledTimes(1);
            expect(mockCourseRepository.getAllCourses).toHaveBeenCalledWith();
            expect(result).toBe(courses);
        })

        it('should receive zero courses when called getAllCourses', async () => {
            // Arrange
            const courses: Course[] = [];
            mockCourseRepository.getAllCourses.mockReturnValue(Promise.resolve(courses));

            // Act
            const result = await courseService.getAllCourses();

            // Arrange
            expect(mockCourseRepository.getAllCourses).toHaveBeenCalledTimes(1);
            expect(mockCourseRepository.getAllCourses).toHaveBeenCalledWith();
            expect(result).toBe(courses);
        })

        it('should add a course', async () => {
            // Arrange
            const name = 'Test';
            const newCourse = new Course(name);
            mockCourseRepository.getCourseByName.mockReturnValue(Promise.resolve(undefined));

            // Act
            await courseService.addCourse(newCourse);

            // Arrange
            expect(mockCourseRepository.addCourse).toHaveBeenCalledTimes(1);
            expect(mockCourseRepository.addCourse).toHaveBeenCalledWith(newCourse);
            expect(mockCourseRepository.getCourseByName).toHaveBeenCalledTimes(1);
            expect(mockCourseRepository.getCourseByName).toHaveBeenCalledWith(name);
        })

        it('should add a student to a course and send notifications', async () => {
            // Arrange
            const courseName = 'Test';
            const course = new Course(courseName);
            const studentName = 'John';
            const student = new Student(studentName);
            const email = 'Email: ';
            const message = email.concat(studentName).concat(' student was added to course.');
            const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
            const result = Promise.resolve(true);
            mockCourseRepository.getCourseByName.mockReturnValue(Promise.resolve(course));
            mockPaymentService.getIsOrderPayed.mockReturnValue(result);

            // Act
            await courseService.addStudentToCourse(student, courseName);

            // Assert
            expect(mockCourseRepository.getCourseByName).toHaveBeenCalledTimes(1);
            expect(mockCourseRepository.getCourseByName).toHaveBeenCalledWith(courseName);
            expect(mockPaymentService.getIsOrderPayed).toHaveBeenCalledTimes(1);
            expect(mockPaymentService.getIsOrderPayed).toHaveBeenCalledWith(student);
            expect(consoleLogSpy).toHaveBeenCalledWith(message);
        })
    })

    describe('Error paths', () => {
        it('should get an exception when called getCourseByName', async () => {
            // Arrange
            const name = 'test';
            const exception = new CourseNotFoundException('Course not found with name: ' + name);
            mockCourseRepository.getCourseByName.mockReturnValue(Promise.resolve(undefined));

            // Act and assert
            await expect(() => courseService.getCourseByName(name)).rejects.toThrow(exception);
            expect(mockCourseRepository.getCourseByName).toHaveBeenCalledTimes(1);
            expect(mockCourseRepository.getCourseByName).toHaveBeenCalledWith(name);
        })

        it('should get an exception if addCourse is called with a course already added', async () => {
            // Arrange
            const name = 'Test';
            const newCourse = new Course(name);
            const exception = new CourseAlreadyAddedException('Course already added!');
            mockCourseRepository.getCourseByName.mockReturnValue(Promise.resolve(newCourse));

            // Act and Arrange
            await expect(() => courseService.addCourse(newCourse)).rejects.toThrow(exception);
            expect(mockCourseRepository.addCourse).toHaveBeenCalledTimes(0);
            expect(mockCourseRepository.getCourseByName).toHaveBeenCalledTimes(1);
            expect(mockCourseRepository.getCourseByName).toHaveBeenCalledWith(name);
        })

        it('should get an exception if try to add a student to a non-existent course', async () => {
            // Arrange
            const courseName = 'Test';
            const student = new Student('John');
            const exception = new CourseNotFoundException('Course not found with name: ' + courseName)
            mockCourseRepository.getCourseByName.mockReturnValue(Promise.resolve(undefined));

            // Act and assert
            await expect(() => courseService.addStudentToCourse(student, courseName)).rejects.toThrow(exception);
            expect(mockCourseRepository.getCourseByName).toHaveBeenCalledTimes(1);
            expect(mockCourseRepository.getCourseByName).toHaveBeenCalledWith(courseName);
            expect(mockPaymentService.getIsOrderPayed).toHaveBeenCalledTimes(0);
        })

        it('should get an exception if try to add a student to the same course', async () => {
            // Arrange
            const courseName = 'Test';
            const student = new Student('John');
            const course = new Course(courseName);
            course.addStudent(student);
            const result = Promise.resolve(true);
            const exception = new StudentAlreadyAddedException('Student already added to the course!');
            mockCourseRepository.getCourseByName.mockReturnValue(Promise.resolve(course));
            mockPaymentService.getIsOrderPayed.mockReturnValue(result);

            // Act and assert
            await expect(() => courseService.addStudentToCourse(student, courseName)).rejects.toThrow(exception);
            expect(mockCourseRepository.getCourseByName).toHaveBeenCalledTimes(1);
            expect(mockCourseRepository.getCourseByName).toHaveBeenCalledWith(courseName);
            expect(mockPaymentService.getIsOrderPayed).toHaveBeenCalledTimes(1);
            expect(mockPaymentService.getIsOrderPayed).toHaveBeenCalledWith(student);
        })

        it('should get an exception if try to add a student without paying', async () => {
            // Arrange
            const courseName = 'Test';
            const student = new Student('John');
            const course = new Course(courseName);
            const exception = new CourseNotPaidException('Course not paid yet!');
            const result = false;
            mockCourseRepository.getCourseByName.mockReturnValue(Promise.resolve(course));
            mockPaymentService.getIsOrderPayed.mockReturnValue(Promise.resolve(result));

            // Act and assert
            await expect(() => courseService.addStudentToCourse(student, courseName)).rejects.toThrow(exception);
            expect(mockCourseRepository.getCourseByName).toHaveBeenCalledTimes(1);
            expect(mockCourseRepository.getCourseByName).toHaveBeenCalledWith(courseName);
            expect(mockPaymentService.getIsOrderPayed).toHaveBeenCalledTimes(1);
            expect(mockPaymentService.getIsOrderPayed).toHaveBeenCalledWith(student);
        })
    })
})