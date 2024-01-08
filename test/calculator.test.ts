import { Calculator } from "../src/calculator";

describe('Calculator test', () => {

    let calculator: Calculator;

    beforeEach(() => {
        calculator = new Calculator();
    })

    describe('Add tests', () => {

        test("Add test with positive integers", () => {
            //Arrange
            const a = 5;
            const b = 3;
            const expected = 8;

            //Act
            const actual = calculator.Add(a, b);

            //Assert
            expect(actual).toBe(expected);
        })

        test("Add test with negative integers", () => {
            //Arrange
            const a = -5;
            const b = -3;
            const expected = -8;

            //Act
            const actual = calculator.Add(a, b);

            //Assert
            expect(actual).toBe(expected);
        })

        test("Add test with zero", () => {
            //Arrange
            const a = 5;
            const b = 0;
            const expected = 5;

            //Act
            const actual = calculator.Add(a, b);

            //Assert
            expect(actual).toBe(expected);
        })

        test("Add test with floating-point numbers", () => {
            //Arrange
            const a = 5.3;
            const b = 1.2;
            const expected = 6.5;

            //Act
            const actual = calculator.Add(a, b);

            //Assert
            expect(actual).toBe(expected);
        })

        test("Add test the commutative property:", () => {
            //Arrange
            const a = 5;
            const b = 1;
            const expected = 6;

            //Act
            const actual = calculator.Add(a, b);
            const actualReverseOrder = calculator.Add(b, a);

            //Assert
            expect(actual).toBe(expected);
            expect(actualReverseOrder).toBe(expected);
        })
    })

    describe('Subtract tests', () => {

        test("Subtract test with positive integers", () => {
            //Arrange
            const a = 5;
            const b = 3;
            const expected = 2;

            //Act
            const actual = calculator.Subtract(a, b);

            //Assert
            expect(actual).toBe(expected);
        })

        test("Subtract test with negative integers", () => {
            //Arrange
            const a = -5;
            const b = -3;
            const expected = -2;

            //Act
            const actual = calculator.Subtract(a, b);

            //Assert
            expect(actual).toBe(expected);
        })

        test("Subtract test with zero", () => {
            //Arrange
            const a = 5;
            const b = 0;
            const expected = 5;

            //Act
            const actual = calculator.Subtract(a, b);

            //Assert
            expect(actual).toBe(expected);
        })

        test("Subtract test with floating-point numbers", () => {
            //Arrange
            const a = 5.5;
            const b = 1.3;
            const expected = 4.2;

            //Act
            const actual = calculator.Subtract(a, b);

            //Assert
            expect(actual).toBe(expected);
        })

        test("Subtract test with positive integers, where A is less", () => {
            //Arrange
            const a = 3;
            const b = 5;
            const expected = -2;

            //Act
            const actual = calculator.Subtract(a, b);

            //Assert
            expect(actual).toBe(expected);
        })

        test("Subtract test with positive integers, where B is less", () => {
            //Arrange
            const a = 5;
            const b = 3;
            const expected = 2;

            //Act
            const actual = calculator.Subtract(a, b);

            //Assert
            expect(actual).toBe(expected);
        })
    })

    describe('Multiply tests', () => {

        test("Multiply test with positive integers", () => {
            //Arrange
            const a = 5;
            const b = 3;
            const expected = 15;

            //Act
            const actual = calculator.Multiply(a, b);

            //Assert
            expect(actual).toBe(expected);
        })

        test("Multiply test with negative integers", () => {
            //Arrange
            const a = -5;
            const b = -3;
            const expected = 15;

            //Act
            const actual = calculator.Multiply(a, b);

            //Assert
            expect(actual).toBe(expected);
        })

        test("Multiply test with zero", () => {
            //Arrange
            const a = 5;
            const b = 0;
            const expected = 0;

            //Act
            const actual = calculator.Multiply(a, b);

            //Assert
            expect(actual).toBe(expected);
        })

        test("Multiply test with floating-point numbers", () => {
            //Arrange
            const a = 5.2;
            const b = 1.3;
            const expected = 6.760000000000001;

            //Act
            const actual = calculator.Multiply(a, b);

            //Assert
            expect(actual).toBe(expected);
        })

        test("Multiply test the commutative property:", () => {
            //Arrange
            const a = 5;
            const b = 2;
            const expected = 10;

            //Act
            const actual = calculator.Multiply(a, b);
            const actualReverseOrder = calculator.Multiply(b, a);

            //Assert
            expect(actual).toBe(expected);
            expect(actualReverseOrder).toBe(expected);
        })
    })

    describe('Divide tests', () => {

        test("Divide test with positive integers", () => {
            //Arrange
            const a = 6;
            const b = 3;
            const expected = 2;

            //Act
            const actual = calculator.Divide(a, b);

            //Assert
            expect(actual).toBe(expected);
        })

        test("Divide test with negative integers", () => {
            //Arrange
            const a = -6;
            const b = -3;
            const expected = 2;

            //Act
            const actual = calculator.Divide(a, b);

            //Assert
            expect(actual).toBe(expected);
        })

        test("Divide test with zero", () => {
            //Arrange
            const a = 0;
            const b = 6;
            const expected = 0;

            //Act
            const actual = calculator.Divide(a, b);

            //Assert
            expect(actual).toBe(expected);
        })

        test("Divide test with zero divisor", () => {
            //Arrange
            const a = 6;
            const b = 0;
            const expected = new Error('Cannot divide by zero');

            //Act
            const actual = () => calculator.Divide(a, b);

            //Assert
            expect(actual).toThrow(expected);
        })

        test("Divide test with zero dividend", () => {
            //Arrange
            const a = 0;
            const b = 6;
            const expected = 0;

            //Act
            const actual = calculator.Divide(a, b);

            //Assert
            expect(actual).toBe(expected);
        })

        test("Divide test with floating-point numbers", () => {
            //Arrange
            const a = 5.5;
            const b = 2.1;
            const expected = 2.619047619047619;

            //Act
            const actual = calculator.Divide(a, b);

            //Assert
            expect(actual).toBe(expected);
        })

        test("Divide test with zero divisor", () => {
            //Arrange
            const a = 5.5;
            const b = 0;
            const expected = new Error('Cannot divide by zero');

            //Act
            const actual = () => calculator.Divide(a, b);

            //Assert
            expect(actual).toThrow(expected);
        })
    })

    describe('SquareRoot tests', () => {

        test("SquareRoot test with positive integers", () => {
            //Arrange
            const a = 9;
            const expected = 3;

            //Act
            const actual = calculator.SquareRoot(a);

            //Assert
            expect(actual).toBe(expected);
        })

        test("SquareRoot test with zero", () => {
            //Arrange
            const a = 0;
            const expected = 0;

            //Act
            const actual = calculator.SquareRoot(a);

            //Assert
            expect(actual).toBe(expected);
        })

        test("SquareRoot test with negative integers", () => {
            //Arrange
            const a = -9;
            const expected = new Error('Invalid input');

            //Act
            const actual = () => calculator.SquareRoot(a);

            //Assert
            expect(actual).toThrow(expected);
        })
    })

    describe('Power tests', () => {

        test("Power test with positive integers", () => {
            //Arrange
            const a = 9;
            const b = 2;
            const expected = 81;

            //Act
            const actual = calculator.Power(a, b);

            //Assert
            expect(actual).toBe(expected);
        })

        test("Power test with negative integers", () => {
            //Arrange
            const a = -9;
            const b = 2;
            const expected = 81;

            //Act
            const actual = calculator.Power(a, b);

            //Assert
            expect(actual).toBe(expected);
        })

        test("Power test with zero exponent", () => {
            //Arrange
            const a = 9;
            const b = 0;
            const expected = 1;

            //Act
            const actual = calculator.Power(a, b);

            //Assert
            expect(actual).toBe(expected);
        })

        test("Power test with zero base", () => {
            //Arrange
            const a = 0;
            const b = 5;
            const expected = 0;

            //Act
            const actual = calculator.Power(a, b);

            //Assert
            expect(actual).toBe(expected);
        })

        test("Power test with floating-point numbers", () => {
            //Arrange
            const a = 9.6;
            const b = 2.2;
            const expected = 144.87608873716957;

            //Act
            const actual = calculator.Power(a, b);

            //Assert
            expect(actual).toBe(expected);
        })

        test("Power test with large numbers", () => {
            //Arrange
            const a = 201;
            const b = 550;
            const expected = Infinity;

            //Act
            const actual = calculator.Power(a, b);

            //Assert
            expect(actual).toBe(expected);
        })
    })
})
