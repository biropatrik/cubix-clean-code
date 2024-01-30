import { IFinancialApiClient } from "../abstraction/client/IFinancialApiClient";
import { IFinancialService } from "../abstraction/service/IFinancialService";
import { NetworkException } from "../exception/NetworkException";
import { UnknownException } from "../exception/UnknownException";
import { Student } from "../model/Student";

export class FinancialApiClient implements IFinancialApiClient {

    constructor(private financialService: IFinancialService) { }

    async getIsOrderPayed(student: Student): Promise<boolean> {
        try {
            return await this.financialService.getIsOrderPayed(student);
        } catch (error) {
            if (error instanceof NetworkException) {
                throw error;
            }
            throw new UnknownException('Unknown error happened.');
        }
    }

    async payForCourse(student: Student, courseName: string): Promise<void> {
        try {
            await this.financialService.payForCourse(student, courseName);
        } catch (error) {
            if (error instanceof NetworkException) {
                throw error;
            }
            throw new UnknownException('Unknown error happened.');
        }
    }
}