import { IFinancialApiClient } from "../../src/abstraction/client/IFinancialApiClient";
import { IFinancialService } from "../../src/abstraction/service/IFinancialService";
import { FinancialApiClient } from "../../src/client/FinancialApiClient";
import { NetworkException } from "../../src/exception/NetworkException";
import { UnknownException } from "../../src/exception/UnknownException";
import { Student } from "../../src/model/Student";
import { mock, mockReset } from "jest-mock-extended";

describe('FinancialApiClient tests', () => {
    let financialApiClient: IFinancialApiClient;
    const mockFinancialService = mock<IFinancialService>();

    beforeEach(() => {
        mockReset(mockFinancialService);
        financialApiClient = new FinancialApiClient(mockFinancialService);
    })

    describe('Happy paths', () => {
        it('should check student is paid', async () => {
            // Arrange
            const student = new Student('John');
            const expectedResult = true;
            mockFinancialService.getIsOrderPayed.mockReturnValue(expectedResult);

            // Act
            const result = await financialApiClient.getIsOrderPayed(student);

            // Assert
            expect(mockFinancialService.getIsOrderPayed).toHaveBeenCalledTimes(1);
            expect(mockFinancialService.getIsOrderPayed).toHaveBeenCalledWith(student);
            expect(result).toBe(expectedResult);
        })

        it('should pay for a course', async () => {
            // Arrange
            const courseName = 'Java';
            const student = new Student('Test');

            // Act
            await financialApiClient.payForCourse(student, courseName);

            // Assert
            expect(mockFinancialService.payForCourse).toHaveBeenCalledTimes(1);
            expect(mockFinancialService.payForCourse).toHaveBeenCalledWith(student, courseName);
        })
    })

    describe('Error paths', () => {
        it.each`
        testName | exception | expectedException
        ${'network exception'} | ${new NetworkException('Network error')} | ${new NetworkException('Network error')}}
        ${'unknown exception'} | ${new Error('error')} | ${new UnknownException('Unknown error happened.')}}
        `('should get a(n) $testName when call getIsOrderPayed', async ({ exception, expectedException}) => {
            // Arrange
            const student = new Student('John');
            mockFinancialService.getIsOrderPayed.mockImplementation(() => { throw exception });

            // Act and assert
            await expect(() => financialApiClient.getIsOrderPayed(student)).rejects.toThrow(expectedException);
            expect(mockFinancialService.getIsOrderPayed).toHaveBeenCalledTimes(1);
            expect(mockFinancialService.getIsOrderPayed).toHaveBeenCalledWith(student);
        });

        it.each`
        testName | exception | expectedException
        ${'network exception'} | ${new NetworkException('Network error')} | ${new NetworkException('Network error')}}
        ${'unknown exception'} | ${new Error('error')} | ${new UnknownException('Unknown error happened.')}}
        `('should get a(n) $testName when call payForCourse', async ({ exception, expectedException}) => {
            // Arrange
            const courseName = 'Java';
            const student = new Student('Test');
            mockFinancialService.payForCourse.mockImplementation(() => { throw exception });

            // Act and assert
            await expect(() => financialApiClient.payForCourse(student, courseName)).rejects.toThrow(expectedException);
            expect(mockFinancialService.payForCourse).toHaveBeenCalledTimes(1);
            expect(mockFinancialService.payForCourse).toHaveBeenCalledWith(student, courseName);
        });
    })
})