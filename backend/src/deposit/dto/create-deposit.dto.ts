import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { CurrencyCode } from "src/common/currency-code.enum";

export class CreateDepositDto {
    @IsEnum(CurrencyCode)
    @IsNotEmpty()
    currencyCode: CurrencyCode;

    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNumber()
    @IsNotEmpty()
    exchangePointId: number;
}