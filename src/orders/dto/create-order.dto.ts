import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

/*
    @ApiProperty({example: 3})
    id: number;

    @ApiProperty({example: 4})
    client_id: number;

    @ApiProperty({example: '2024-03-24T18:53:11.000Z'})
    order_date: string;

    @ApiProperty({example: 'г. Томск ул. Усова 15Б'})
    address: string;

    @ApiProperty({example: 'В доставке'})
    status: string;

    @ApiProperty({example: false})
    payment_method: boolean;

    @ApiProperty({example: '2024-03-24T18:53:11.000Z'})
    departure_date: string;

    @ApiProperty({example: '2024-03-24T18:53:11.000Z'})
    arrival_date: string;

    @ApiProperty({example: '2024-03-24T18:53:11.000Z'})
    createdAt: string;

    @ApiProperty({example: '2024-03-24T18:53:11.000Z'})
    updatedAt: string;
*/

export class createOrderDto{
    @ApiProperty({ example: 11 })
    @IsNotEmpty()
    readonly client_id: number;

    @ApiProperty({ example: '2024-03-24T18:53:11.000Z' })
    @IsNotEmpty()
    readonly order_date: string;

    @ApiProperty({ example: 'г. Томск ул. Усова 15Б' })
    @IsNotEmpty()
    readonly address: string;

    @ApiProperty({ example: 'В доставке' })
    @IsNotEmpty()
    readonly status: string;

    @ApiProperty({ example: 'false' })
    @IsNotEmpty()
    readonly payment_method: boolean;

    @ApiProperty({ example: '2024-03-24T18:53:11.000Z' })
    @IsNotEmpty()
    readonly departure_date: string;

    @ApiProperty({ example: '2024-03-24T18:53:11.000Z' })
    @IsNotEmpty()
    readonly arrival_date: string;

}