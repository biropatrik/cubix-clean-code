import { CurrencyConverter } from "../src/currencyConverter";
import { IExchangeRateService } from "../src/exchangeRateService";
import { mock, mockReset } from 'jest-mock-extended';

const mockedExchangeRateService = mock<IExchangeRateService>();

describe('Generate conversion report tests', () => {
    let currencyConverter: CurrencyConverter;

    beforeEach(() => {
        mockReset(mockedExchangeRateService);
        currencyConverter = new CurrencyConverter(mockedExchangeRateService);
    })

    it('should generate conversion report', () => {
        //Arrange
        const numberOfDays = 3;
        let startDate = new Date();
        let endDate = new Date();
        endDate.setDate(startDate.getDate() + (numberOfDays - 1));
        mockedExchangeRateService.getExchangeRate.mockReturnValueOnce(370).mockReturnValueOnce(380).mockReturnValueOnce(400);

        //Act
        const result = currencyConverter.GenerateConversionReport('eur', 'huf', startDate, endDate);

        //Assert
        expect(mockedExchangeRateService.getExchangeRate).toHaveBeenCalledTimes(numberOfDays);
        expect(mockedExchangeRateService.getExchangeRate).toHaveBeenNthCalledWith(1, 'eur', 'huf');
        expect(mockedExchangeRateService.getExchangeRate).toHaveNthReturnedWith(1, 370);

        expect(mockedExchangeRateService.getExchangeRate).toHaveBeenNthCalledWith(2, 'eur', 'huf');
        expect(mockedExchangeRateService.getExchangeRate).toHaveNthReturnedWith(2, 380);

        expect(mockedExchangeRateService.getExchangeRate).toHaveBeenNthCalledWith(3, 'eur', 'huf');
        expect(mockedExchangeRateService.getExchangeRate).toHaveNthReturnedWith(3, 400);

        expect(result).toMatchSnapshot();
    })
})