import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateExchangePointDto {
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    address: string;
}