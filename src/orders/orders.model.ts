import { Table, Model, Column } from "sequelize-typescript";

@Table
export class Orders extends Model {
    @Column
    client_id: number;

    @Column
    order_date: string;

    @Column
    address: string;

    @Column
    status: string;

    @Column
    payment_method: boolean;

    @Column
    departure_date: string;

    @Column
    arrival_date: string;
}