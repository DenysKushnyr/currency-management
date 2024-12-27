import { CurrencyCode } from "src/common/currency-code.enum";

export class CreateTransactionDto {
    exchangePointId: number;
    currencyCodeFrom: CurrencyCode;
    amountFrom: number;
    currencyCodeTo: CurrencyCode;
    amountTo: number;
}