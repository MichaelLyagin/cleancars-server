import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class createProductDto{
    @ApiProperty({ example: 'Автошампунь' })
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({ example: 'Очень крутой автошампунь' })
    @IsNotEmpty()
    readonly despription: string;

    @ApiProperty({ example: 'empty' })
    @IsNotEmpty()
    readonly img: string;

    @ApiProperty({ example: '11' })
    @IsNotEmpty()
    readonly category_id: number;

    @ApiProperty({ example: '400' })
    @IsNotEmpty()
    readonly price: number;

    @ApiProperty({ example: 'Foam Heroes' })
    @IsNotEmpty()
    readonly brand: string;

    @ApiProperty({ example: '1000' })
    @IsNotEmpty()
    readonly volume: number;

    @ApiProperty({ example: '27' })
    @IsNotEmpty()
    readonly in_stock: number;

    @ApiProperty({ example: '738D34' })
    @IsNotEmpty()
    readonly vendor_code: string;

    @ApiProperty({ example: '7' })
    @IsNotEmpty()
    readonly popularity: number;

    @ApiProperty({ example: true })
    @IsNotEmpty()
    readonly bestseller: boolean;

}

export class updateProductDto{
    @ApiProperty({ example: 123 })
    @IsNotEmpty()
    readonly id: number;

    @ApiProperty({ example: 'Автошампунь' })
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({ example: 'Очень крутой автошампунь' })
    @IsNotEmpty()
    readonly despription: string;

    @ApiProperty({ example: 'empty' })
    @IsNotEmpty()
    readonly img: string;

    @ApiProperty({ example: '11' })
    @IsNotEmpty()
    readonly category_id: number;

    @ApiProperty({ example: '400' })
    @IsNotEmpty()
    readonly price: number;

    @ApiProperty({ example: 'Foam Heroes' })
    @IsNotEmpty()
    readonly brand: string;

    @ApiProperty({ example: '1000' })
    @IsNotEmpty()
    readonly volume: number;

    @ApiProperty({ example: '27' })
    @IsNotEmpty()
    readonly in_stock: number;

    @ApiProperty({ example: '738D34' })
    @IsNotEmpty()
    readonly vendor_code: string;

    @ApiProperty({ example: '7' })
    @IsNotEmpty()
    readonly popularity: number;

    @ApiProperty({ example: true })
    @IsNotEmpty()
    readonly bestseller: boolean;

}

export class updateProductCountDto{
    @ApiProperty({ example: 123 })
    @IsNotEmpty()
    readonly id: number;

    @ApiProperty({ example: '27' })
    @IsNotEmpty()
    readonly in_stock: number;

}