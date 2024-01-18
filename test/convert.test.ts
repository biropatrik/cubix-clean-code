import { CurrencyConverter } from "../src/currencyConverter";
import { ValidationError } from "../src/exceptions/ValidationError";
import { ExchangeRateValidationError } from "../src/exceptions/ExchangeRateValidationError";
import { IExchangeRateService } from "../src/exchangeRateService";
import { mock, mockReset } from 'jest-mock-extended';

const mockedExchangeRateService = mock<IExchangeRateService>();

describe('Convert tests', () => {
    let currencyConverter: CurrencyConverter;
    const fromCurrency = 'eur';
    const toCurrency = 'huf';

    beforeEach(() => {
        mockReset(mockedExchangeRateService);
        currencyConverter = new CurrencyConverter(mockedExchangeRateService);
    })

    describe('Happy paths', () => {

        it.each`
        testName | value | mockReturnValue | expectedValue
        ${'convert with positive number'} | ${2} | ${400} | ${800}
        ${'convert with zero'} | ${0} | ${400} | ${0}
        `('should $testName', ({ value, mockReturnValue, expectedValue }) => {
            // Arrange
            mockedExchangeRateService.getExchangeRate.mockReturnValue(mockReturnValue);

            // Act
            const actual = currencyConverter.Convert(value, fromCurrency, toCurrency);

            // Assert
            expect(mockedExchangeRateService.getExchangeRate).toHaveBeenCalledTimes(1);
            expect(mockedExchangeRateService.getExchangeRate).toHaveBeenCalledWith(fromCurrency, toCurrency);
            expect(mockedExchangeRateService.getExchangeRate).toHaveReturnedWith(mockReturnValue);
            expect(actual).toBe(expectedValue);
        })
    })


    describe('Error paths', () => {
        it.each`
        testName | value | mockReturnValue | error
        ${'ExchangeRateValidationError - Unable to fetch exchange rate.'} | ${1} | ${NaN} | ${new ExchangeRateValidationError('Unable to fetch exchange rate.')}
        ${'ValidationError'} | ${NaN} | ${400} | ${new ValidationError('Invalid amount input.')}
        `('should throw a(n) $testName', ({value, mokcReturnValue, error}) => {
            // Arrange
            mockedExchangeRateService.getExchangeRate.mockReturnValue(mokcReturnValue);

            // Act and assert
            expect(() => currencyConverter.Convert(value, fromCurrency, toCurrency)).toThrow(error);
            expect(mockedExchangeRateService.getExchangeRate).toHaveBeenCalledTimes(1);
            expect(mockedExchangeRateService.getExchangeRate).toHaveBeenCalledWith(fromCurrency, toCurrency);
        })
    })
})
