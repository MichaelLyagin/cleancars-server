import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class createOrderItemDto{
    @ApiProperty({ example: 183 })
    @IsNotEmpty()
    readonly order_id: number;

    @ApiProperty({ example: 11 })
    @IsNotEmpty()
    readonly product_id: number;

    @ApiProperty({ example: 4 })
    @IsNotEmpty()
    readonly quantity: number;

    @ApiProperty({ example: 840 })
    @IsNotEmpty()
    readonly price: number;
}

export class checkOrderItemDto{
    @ApiProperty({ example: 183 })
    @IsNotEmpty()
    readonly order_id: number;

    @ApiProperty({ example: 11 })
    @IsNotEmpty()
    readonly product_id: number;

}

