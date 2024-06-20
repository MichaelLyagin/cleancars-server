import { Table, Model, Column } from "sequelize-typescript";

@Table
export class Review extends Model {
    @Column
    product_id: number;

    @Column
    client_id: number;

    @Column
    date: string;

    @Column
    rating: number;

    @Column
    comment: string;
}