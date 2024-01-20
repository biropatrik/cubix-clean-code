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

    describe('Process user data tests', () => {
        it.each`
        testName | users | user | a | b | count | expectedResult
        ${'found the given user'} | ${['Tom', 'Bill', 'Jack']} | ${'Tom'} | ${true} | ${true} | ${0} | ${'User found: Tom at index 0'}
        ${'not found the given user'} | ${['Tom', 'Bill', 'Jack']} | ${'Test'} | ${true} | ${true} | ${0} | ${''}
        ${'processing'} | ${[]} | ${''} | ${false} | ${true} | ${2} | ${'Processing... Processing... '}
        ${'no action'} | ${[]} | ${''} | ${false} | ${false} | ${1} | ${'No action taken.'}
        `('should $testName', ({ users, user, a, b, count, expectedResult}) => {
            // Act
            const result = sut.processUserData(a, b, users, user, count);

            // Assert
            expect(result).toBe(expectedResult);
        });
    })
})