/*
    {
        "id": 4,
        "user_id": 4,
        "product_id": 2,
        "count": 1,
        "createdAt": "2024-03-25T17:50:10.000Z",
        "updatedAt": "2024-03-25T17:50:10.000Z"
    },
*/

import { ApiProperty } from "@nestjs/swagger";

class CartItem {
    @ApiProperty({example: 3})
    id: number;

    @ApiProperty({example: 4})
    user_id: number;

    @ApiProperty({example: 2})
    product_id: number;

    @ApiProperty({example: 1})
    count: number;

    @ApiProperty({example: '2024-03-24T17:04:50.240Z'})
    updatedAt: string;

    @ApiProperty({example: '2024-03-24T17:04:50.240Z'})
    createdAt: string;
}

export class GetAllResponse extends CartItem{}

export class AddToCartResponse extends CartItem{}

export class UpdateCountResponse extends CartItem{}