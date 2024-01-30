import { Student } from "../../model/Student";

export interface IFinancialApiClient {
    getIsOrderPayed(student: Student): Promise<boolean>;
    payForCourse(student: Student, courseName: string): Promise<void>;
}