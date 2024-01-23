import { Discount } from "../src/discount";

describe('Discount tests', () => {

    let sut: Discount;

    beforeEach(() => {
        sut = new Discount();
    })

    it.each`
    testName | subscriptionLevel | expectedDiscount
    ${'return 5 with standard subscription'} | ${'standard'} | ${5}
    ${'return 10 with silver subscription'} | ${'silver'} | ${10}
    ${'return 20 with gold subscription'} | ${'gold'} | ${20}
    ${'return 0 without subscription'} | ${''} | ${0}
    `('should $testName', ({ subscriptionLevel, expectedDiscount }) => {
        // Act
        const result = sut.calculateDiscountPercentage(subscriptionLevel);

        // Assert
        expect(result).toBe(expectedDiscount);
    });
})
