export class Calculator {

    public Add(a: number, b: number) {
        return a + b;
    }

    public Subtract(a: number, b: number) {
        return a - b;
    }

    public Multiply(a: number, b: number) {
        return a * b;
    }

    public Divide(a: number, b: number) {
        if (b === 0) {
            throw new Error('Cannot divide by zero');
        }
        return a / b;
    }

    public SquareRoot(a: number) {
        if (a < 0) {
            throw new Error('Invalid input');
        }
        return Math.sqrt(a);
    }

    public Power(a: number, b: number) {
        return Math.pow(a, b);
    }

}