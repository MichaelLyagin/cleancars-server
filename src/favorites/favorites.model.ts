import { Table, Model, Column } from "sequelize-typescript";

@Table
export class Favorites extends Model {
    @Column
    user_id: number;

    @Column
    product_id: number;

}