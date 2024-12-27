import { CurrencyCode } from "src/common/currency-code.enum";

export class CreateBalanceDto {
    exchangePointId: number;
    currencyCode: CurrencyCode;
    amount: number;
}