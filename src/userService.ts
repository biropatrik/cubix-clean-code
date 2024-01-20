export class UserService {

    readonly MIN_LENGTH_OF_INPUT = 5;
    readonly MAX_LENGTH_OF_INPUT = 20;
    readonly REGEXP_FOR_INPUT = /^[a-zA-Z0-9]+$/;

    public validateUserInput(input: string): boolean {
        return this.isInputContainsOnlyWhitespaces(input) &&
            this.isInputLenghtBetweenAAndB(input, this.MIN_LENGTH_OF_INPUT, this.MAX_LENGTH_OF_INPUT) &&
            this.validateInputByRegExp(input, this.REGEXP_FOR_INPUT);
    }

    private isInputContainsOnlyWhitespaces(input: string) {
        return input.trim() !== '';
    }

    private isInputLenghtBetweenAAndB(input: string, a: number, b: number) {
        return input.length >= a && input.length <= b;
    }

    private validateInputByRegExp(input: string, regExp: RegExp) {
        return regExp.test(input);
    }

    public processUserData(a: boolean, b: boolean, users: string[], user: string, counter: number): string {
        let result = a && b ? this.findUserInArray(user, users)! : 'No action taken.';
        return !a && b ? this.processCounts(counter) : result;
    }

    private processCounts(counter: number) {
        let result = '';
        for (let i = 0; i < counter; i++) {
            result += 'Processing... ';
        }
        return result;
    }

    private findUserInArray(user: string, users: string[]) {
        for (let i = 0; i < users.length; i++) {
            if (users[i] === user) {
                return 'User found: ' + user + ' at index ' + i;
            }
        }
        return '';
    }

}