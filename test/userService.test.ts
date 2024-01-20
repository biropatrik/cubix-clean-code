import { UserService } from "../src/userService";

describe('UserService tests', () => {
    let sut: UserService;

    beforeEach(() => {
        sut = new UserService();
    })

    describe('User input validation tests', () => {
        it.each`
        testName | input | expectedResult
        ${'true when input contains only chars and numbers'} | ${'abcdeabcd12345eabcde'} | ${true}
        ${'false when input contains only whitespaces'} | ${'   '} | ${false}
        ${'false when input length is less then 5'} | ${'abcd'} | ${false}
        ${'false when input length is greater then 20'} | ${'abcdeabcde abcdeabcde abcdeabcde'} | ${false}
        `('should return $testName', ({ input, expectedResult}) => {
            // Act
            const result = sut.validateUserInput(input);

            // Assert
            expect(result).toBe(expectedResult);
        });
    })
})