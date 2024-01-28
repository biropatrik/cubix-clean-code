import { ICourseRepository } from "../abstraction/repository/ICourseRepository";
import { ICourseService } from "../abstraction/service/ICourseService";
import { INotificationService } from "../abstraction/service/INotificationService";
import { IPaymentService } from "../abstraction/service/IPaymentService";
import { CourseAlreadyAddedException } from "../exception/CourseAlreadyAddedException";
import { CourseNotFoundException } from "../exception/CourseNotFoundException";
import { CourseNotPaidException } from "../exception/CourseNotPaidException";
import { Course } from "../model/Course";
import { Student } from "../model/Student";

export class CourseService implements ICourseService {

    constructor(
        private courseRepository: ICourseRepository,
        private paymentService: IPaymentService,
        private notificationService: INotificationService) { }

    getCourseByName(name: string): Course {
        let course = this.courseRepository.getCourseByName(name);
        
        if (course === undefined) {
            throw new CourseNotFoundException('Course not found with name: ' + name);
        }

        return course;
    }

    getAllCourses(): Course[] {
        return this.courseRepository.getAllCourses();
    }
    
    addCourse(course: Course): void {
        if (this.courseRepository.getCourseByName(course.getName()) !== undefined) {
            throw new CourseAlreadyAddedException('Course already added!');
        }

        this.courseRepository.addCourse(course);
    }

    addStudentToCourse(student: Student, courseName: string): void {
        const course = this.getCourseByName(courseName);

        if (!this.paymentService.getIsOrderPayed(student)) {
            throw new CourseNotPaidException('Course not paid yet!');
        }

        course.addStudent(student);

        this.notificationService.sendNotifications(`${student.getName()} student was added to course.`);
    }
}