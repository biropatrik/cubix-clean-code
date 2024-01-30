import { IFinancialApiClient } from "../abstraction/client/IFinancialApiClient";
import { IPaymentService } from "../abstraction/service/IPaymentService";
import { Student } from "../model/Student";

export class PaymentService implements IPaymentService {

    constructor(private financialApiClient: IFinancialApiClient) { }

    async getIsOrderPayed(student: Student): Promise<boolean> {
        return await this.financialApiClient.getIsOrderPayed(student);
    }
    
    async payForCourse(student: Student, courseName: string): Promise<void> {
        await this.financialApiClient.payForCourse(student, courseName);
    }
}