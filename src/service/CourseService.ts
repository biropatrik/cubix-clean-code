import { ICourseRepository } from "../abstraction/repository/ICourseRepository";
import { ICourseService } from "../abstraction/service/ICourseService";
import { INotificationService } from "../abstraction/service/INotificationService";
import { IPaymentService } from "../abstraction/service/IPaymentService";
import { CourseAlreadyAddedException } from "../exception/CourseAlreadyAddedException";
import { CourseNotFoundException } from "../exception/CourseNotFoundException";
import { CourseNotPaidException } from "../exception/CourseNotPaidException";
import { Course } from "../model/Course";
import { CourseStatistic } from "../model/CourseStatistic";
import { Student } from "../model/Student";

export class CourseService implements ICourseService {

    constructor(
        private courseRepository: ICourseRepository,
        private paymentService: IPaymentService,
        private notificationService: INotificationService) { }

    async getCourseByName(name: string): Promise<Course> {
        let course = await this.courseRepository.getCourseByName(name);

        if (!course) {
            throw new CourseNotFoundException('Course not found with name: ' + name);
        }

        return course;
    }

    async getAllCourses(): Promise<Course[]> {
        return await this.courseRepository.getAllCourses();
    }
    
    async addCourse(course: Course): Promise<void> {
        if (await this.courseRepository.getCourseByName(course.getName()) !== undefined) {
            throw new CourseAlreadyAddedException('Course already added!');
        }

        await this.courseRepository.addCourse(course);
    }

    async addStudentToCourse(student: Student, courseName: string): Promise<void> {
        let course = await this.getCourseByName(courseName);

        if (!await this.paymentService.getIsOrderPayed(student)) {
            throw new CourseNotPaidException('Course not paid yet!');
        }

        course.addStudent(student);

        await this.notificationService.sendNotifications(`${student.getName()} student was added to course.`);
    }

    async getCourseStatistics(courseName: string): Promise<CourseStatistic> {
        return await this.courseRepository.getCourseStatistics(courseName);
    }
}