import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class createUserDto{
    @ApiProperty({ example: 'alex' })
    @IsNotEmpty()
    readonly username: string;

    @ApiProperty({ example: 'alex@mail.ru' })
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty({ example: 'alex111' })
    @IsNotEmpty()
    readonly password: string;

    @IsNotEmpty()
    readonly role: boolean;

}