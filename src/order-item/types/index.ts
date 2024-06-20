import { ApiProperty } from "@nestjs/swagger";

export class OrderItem{
    @ApiProperty({example: 3})
    id: number;

    @ApiProperty({example: 4})
    order_id: number;

    @ApiProperty({example: 6})
    product_id: number;
    
    @ApiProperty({example: 2})
    quantity: number;

    @ApiProperty({example: 2340})
    price: number;

    @ApiProperty({example: '2024-03-24T18:53:11.000Z'})
    createdAt: string;

    @ApiProperty({example: '2024-03-24T18:53:11.000Z'})
    updatedAt: string;
}

export class GetAllResponse extends OrderItem{}