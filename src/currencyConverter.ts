import { AmountValidationError } from "./exceptions/AmountValidationError";
import { ExchangeRateValidationError } from "./exceptions/ExchangeRateValidationError";
import { UnknownError } from "./exceptions/UnknownError";
import { IExchangeRateService } from "./exchangeRateService";

export class CurrencyConverter {

    private readonly FIXED_AMOUNT = 100;

    constructor(private exchangeRateService: IExchangeRateService) { }

    public Convert(amount: number, fromCurrency: string, toCurrency: string): number {
        const exchangeRate = this.getExchangeRate(fromCurrency, toCurrency);

        try {
            this.validateAmount(amount);
        } catch (error) {
            if (error instanceof Error) {
                throw new AmountValidationError(error.message);
            }
            throw new UnknownError('Unknown error happened');
        }

        try {
            this.validateExchangeRate(exchangeRate);
        } catch (error) {
            if (error instanceof Error) {
                throw new ExchangeRateValidationError(error.message);
            }
            throw new UnknownError('Unknown error happened');
        }

        return amount * exchangeRate;
    }

    public GenerateConversionReport(
        fromCurrency: string,
        toCurrency: string,
        startDate: Date,
        endDate: Date
    ): string {
        const conversions: number[] = [];

        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            const exchangeRate = this.exchangeRateService.getExchangeRate(fromCurrency, toCurrency);

            try {
                this.validateExchangeRate(exchangeRate);
            } catch (error) {
                if (error instanceof Error) {
                    throw new ExchangeRateValidationError(error.message);
                }
                throw new UnknownError('Unknown error happened');
            }

            this.calculateConversion(exchangeRate, conversions, currentDate);
        }

        return `Conversion Report:\n${conversions.join('\n')}`;
    }

    private getExchangeRate(fromCurrency: string, toCurrency: string) {
        return this.exchangeRateService.getExchangeRate(fromCurrency, toCurrency);
    }

    private calculateConversion(exchangeRate: number, conversions: number[], currentDate: Date) {
        const convertedAmount = this.FIXED_AMOUNT * exchangeRate; // Assume a fixed amount for simplicity
        conversions.push(convertedAmount);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    private validateExchangeRate(exchangeRate: number) {
        if (!exchangeRate) {
            throw new Error('Unable to fetch exchange rate.');
        }

        if (isNaN(exchangeRate)) {
            throw new Error('Invalid exchange rate.');
        }
    }

    private validateAmount(amount: number) {
        if (isNaN(amount)) {
            throw new Error('Invalid amount input.');
        }
    }
}