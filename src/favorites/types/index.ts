import { ApiProperty } from "@nestjs/swagger";

class FavoritesItem {
    @ApiProperty({example: 3})
    id: number;

    @ApiProperty({example: 4})
    user_id: number;

    @ApiProperty({example: 2})
    product_id: number;

    @ApiProperty({example: '2024-03-24T17:04:50.240Z'})
    updatedAt: string;

    @ApiProperty({example: '2024-03-24T17:04:50.240Z'})
    createdAt: string;
}

export class GetAllResponse extends FavoritesItem{}

export class AddToFavoritesResponse extends FavoritesItem{}
