import { FinancialApiClient } from "../../src/client/FinancialApiClient";
import { Student } from "../../src/model/Student";
import { PaymentService } from "../../src/service/PaymentService";
import { mock, mockReset } from "jest-mock-extended";

describe('PaymentService tests', () => {
    let paymentService: PaymentService;
    const mockFinancialApiClient = mock<FinancialApiClient>();

    beforeEach(() => {
        paymentService = new PaymentService(mockFinancialApiClient);
    })

    it('should check student is paid', async () => {
        // Arrange
        const student = new Student('John');
        const result = Promise.resolve(true);
        const expectedResult = true;
        mockFinancialApiClient.getIsOrderPayed.mockReturnValue(result);

        // Act
        const actualResult = await paymentService.getIsOrderPayed(student);

        // Assert
        expect(mockFinancialApiClient.getIsOrderPayed).toHaveBeenCalledTimes(1);
        expect(mockFinancialApiClient.getIsOrderPayed).toHaveBeenCalledWith(student);
        expect(actualResult).toBe(expectedResult);
    })

    it('should pay for a course', async () => {
        // Arrange
        const courseName = 'Java';
        const student = new Student('Test');

        // Act
        await paymentService.payForCourse(student, courseName);

        // Assert
        expect(mockFinancialApiClient.payForCourse).toHaveBeenCalledTimes(1);
        expect(mockFinancialApiClient.payForCourse).toHaveBeenCalledWith(student, courseName);
    })
})