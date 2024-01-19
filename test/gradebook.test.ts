import { Gradebook } from '../src/gradebook'

describe('Gradebook tests', () => {
    let sut: Gradebook

    beforeEach(() => {
        sut = new Gradebook();
    })

    it.each`
    testName | score | expectedGrade
    ${'A grade when score > 90'} | ${91} | ${'A'}
    ${'A grade when score => 90'} | ${90} | ${'A'}
    ${'B grade when score > 80'} | ${89} | ${'B'}
    ${'B grade when score => 80'} | ${80} | ${'B'}
    ${'C grade when score > 70'} | ${75} | ${'C'}
    ${'C grade when score => 70'} | ${70} | ${'C'}
    ${'D grade when score < 70'} | ${50} | ${'D'}
    `('should return the $testName', ({score, expectedGrade}) => {
        // Act
        const result = sut.calculateGrade(score);

        // Assert
        expect(result).toBe(expectedGrade);
    });
})