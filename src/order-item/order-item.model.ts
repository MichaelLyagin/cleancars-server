import { Table, Model, Column } from "sequelize-typescript";

@Table
export class OrderItem extends Model {
    @Column
    order_id: number;

    @Column
    product_id: number;

    @Column
    quantity: number;

    @Column
    price: number;
}