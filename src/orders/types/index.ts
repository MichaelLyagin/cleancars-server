import { ApiProperty } from "@nestjs/swagger";

export class Orders{
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
}

export class GetAllResponse extends Orders{}