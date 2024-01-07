import { Calculator } from "../src/calculator";

describe('Calculator test', () => {

    let calculator: Calculator;

    beforeEach(() => {
        calculator = new Calculator();
    })

    test("Add test", () => {
        //Arrange
        const a = 5;
        const b = 3;
        const expected = 8;

        //Act
        const actual = calculator.Add(a, b);

        //Assert
        expect(actual).toBe(expected);
    })
})