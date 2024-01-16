import { CurrencyConverter } from "../src/currencyConverter";
import { AmountValidationError } from "../src/exceptions/AmountValidationError";
import { ExchangeRateValidationError } from "../src/exceptions/ExchangeRateValidationError";
import { IExchangeRateService } from "../src/exchangeRateService";
import { mock, mockReset } from 'jest-mock-extended';

const mockedExchangeRateService = mock<IExchangeRateService>();

describe('Convert tests', () => {
    let currencyConverter: CurrencyConverter;

    beforeEach(() => {
        mockReset(mockedExchangeRateService);
        currencyConverter = new CurrencyConverter(mockedExchangeRateService);
    })

    describe('Happy paths', () => {

        it('should convert with positive', () => {
            // Arrange
            mockedExchangeRateService.getExchangeRate.mockReturnValue(400);

            // Act
            const actual = currencyConverter.Convert(2, 'eur', 'huf');

            // Assert
            expect(mockedExchangeRateService.getExchangeRate).toHaveBeenCalledTimes(1);
            expect(mockedExchangeRateService.getExchangeRate).toHaveBeenCalledWith('eur', 'huf');
            expect(mockedExchangeRateService.getExchangeRate).toHaveReturnedWith(400);
            expect(actual).toBe(800);
        })

        it('should convert with zero', () => {
            // Arrange
            mockedExchangeRateService.getExchangeRate.mockReturnValue(400);

            // Act
            const actual = currencyConverter.Convert(0, 'eur', 'huf');

            // Assert
            expect(mockedExchangeRateService.getExchangeRate).toHaveBeenCalledTimes(1);
            expect(mockedExchangeRateService.getExchangeRate).toHaveBeenCalledWith('eur', 'huf');
            expect(mockedExchangeRateService.getExchangeRate).toHaveReturnedWith(400);
            expect(actual).toBe(0);
        })
    })


    describe('Error paths', () => {

        it('should throw an ExchangeRateValidationError', () => {
            // Arrange
            const errorMessage = "Unable to fetch exchange rate.";
            const error = new ExchangeRateValidationError(errorMessage);
            const wrongMockReturnValue = NaN;

            mockedExchangeRateService.getExchangeRate.mockReturnValue(wrongMockReturnValue);

            // Act and assert
            expect(() => currencyConverter.Convert(1, 'eur', 'huf')).toThrow(error);
            expect(mockedExchangeRateService.getExchangeRate).toHaveBeenCalledTimes(1);
            expect(mockedExchangeRateService.getExchangeRate).toHaveBeenCalledWith('eur', 'huf');
        })

        it('should throw an AmountValidationError', () => {
            // Arrange
            const errorMessage = "Invalid amount input.";
            const error = new AmountValidationError(errorMessage);
            const wrongInput = NaN;

            // Act and assert
            expect(() => currencyConverter.Convert(wrongInput, 'eur', 'huf')).toThrow(error);
            expect(mockedExchangeRateService.getExchangeRate).toHaveBeenCalledTimes(1);
            expect(mockedExchangeRateService.getExchangeRate).toHaveBeenCalledWith('eur', 'huf');
        })
    })
})
