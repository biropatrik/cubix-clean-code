import { Student } from "../../model/Student";

export interface IFinancialService {
    getIsOrderPayed(student: Student): boolean;
    payForCourse(student: Student, courseName: string): boolean;
}