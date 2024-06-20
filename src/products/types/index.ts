import { ApiProperty } from "@nestjs/swagger";
import { Op } from "sequelize";

export interface IProductQuery {
    limit: string | undefined;
    offset: string | undefined;
    brand: string | undefined;
    priceFrom: number | undefined;
    priceTo: number | undefined;
    volumeFrom: number | undefined;
    volumeTo: number | undefined;
    category: number | undefined;
}

/*
export interface IProductQuery {
    limit: string;
    offset: string;
}*/

/*
{
    "id": 5,
    "name": "Wavex Strip Wash Shampoo",
    "despription": "Очень крутой автошампунь",
    "img": "img",
    "category_id": 11,
    "price": 999,
    "brand": "Chemical Russian",
    "volume": 1000,
    "in_stock": 34,
    "popularity": 2,
    "bestseller": false,
    "createdAt": "2024-03-24T18:53:11.000Z",
    "updatedAt": "2024-03-24T18:53:11.000Z"
}
*/

export class Products{
    @ApiProperty({example: 3})
    id: number;

    @ApiProperty({example: 'Wavex Strip Wash Shampoo'})
    name: string;

    @ApiProperty({example: 'Очень крутой автошампунь'})
    despription: string;

    @ApiProperty({example: 'img'})
    img: string;

    @ApiProperty({example: 11})
    category_id: number;

    @ApiProperty({example: 899})
    price: number;

    @ApiProperty({example: 'Chemical Russian'})
    brand: string;
    
    @ApiProperty({example: 1000})
    volume: number;

    @ApiProperty({example: 73})
    in_stock: number;

    @ApiProperty({example: '83DBR23'})
    vendor_code: string;

    @ApiProperty({example: 3})
    popularity: number;

    @ApiProperty({example: false})
    bestseller: boolean;

    @ApiProperty({example: '2024-03-24T18:53:11.000Z'})
    createdAt: string;

    @ApiProperty({example: '2024-03-24T18:53:11.000Z'})
    updatedAt: string;
}

export class PaginateAndFilterResponse{
    @ApiProperty({example: 3})
    count: number;

    @ApiProperty({type: Products, isArray: true})
    rows: Products[];
}

export class Bestsellers extends Products{
    @ApiProperty({example: true})
    bestseller: boolean;
}

export class GetBestsellersResponse extends PaginateAndFilterResponse{
    @ApiProperty({example: 3})
    count: number;

    @ApiProperty({type: Products, isArray: true})
    rows: Bestsellers[];
}

export class SearchResponse extends PaginateAndFilterResponse{}

export class SearchRequest{
    @ApiProperty({example: 'Wash'})
    search: string;
}

export class GetByNameResponse extends Products{}

export class GetByNameRequest{
    @ApiProperty({example: 'Wavex Strip Wash Shampoo'})
    name: string;
}

export class FindOneResponse extends Products{}

export interface IProductsFilter {
    brand: string | undefined;
    price: { [Op.between]: number[] };
    volume: { [Op.between]: number[] };
  }
