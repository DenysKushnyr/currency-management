import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthUserDto {
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsString()
    @IsNotEmpty()
    username: string;
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsString()
    @MinLength(6)
    password: string;

    exchangePointId: string;
}
