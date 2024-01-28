import { Student } from "../../model/Student";

export interface IPaymentService {
    getIsOrderPayed(student: Student): boolean;
}