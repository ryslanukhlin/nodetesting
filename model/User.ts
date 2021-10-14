import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    login!: string;

    @Column()
    password!: string;
}