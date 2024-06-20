import { Table, Model, Column } from "sequelize-typescript";

@Table
export class Products extends Model {
    @Column
    name: string;

    @Column
    despription: string;

    @Column
    img: string;

    @Column
    category_id: number;

    @Column({ defaultValue: 0 })
    price: number;

    @Column
    brand: string;

    @Column({ defaultValue: 0 })
    volume: number;

    @Column({ defaultValue: 0 })
    in_stock: number;

    @Column
    vendor_code: string;

    @Column
    popularity: number;

    @Column({ defaultValue: false })
    bestseller: boolean;
}