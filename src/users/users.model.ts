import { Table, Model, Column } from "sequelize-typescript";

@Table
export class User extends Model {
    @Column
    username: string;

    @Column
    email: string;

    @Column
    password: string;

    @Column
    role: boolean;
}