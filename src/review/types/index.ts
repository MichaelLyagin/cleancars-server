import { ApiProperty } from "@nestjs/swagger";

export class Review{
    @ApiProperty({example: 3})
    id: number;

    @ApiProperty({example: 14})
    product_id: number;

    @ApiProperty({example: 4})
    client_id: number;

    @ApiProperty({example: '2024-03-24T18:53:11.000Z'})
    date: string;

    @ApiProperty({example: 4})
    rating: number;

    @ApiProperty({example: 'Очень крутой товар'})
    comment: string;

    @ApiProperty({example: '2024-03-24T18:53:11.000Z'})
    createdAt: string;

    @ApiProperty({example: '2024-03-24T18:53:11.000Z'})
    updatedAt: string;
}

export class GetAllResponse extends Review{}