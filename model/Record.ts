import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';

@Entity()
export default class Record {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    date!: Date;

    @Column()
    typeMessage!: 'text' | 'file';

    @Column()
    message!: string;

    @ManyToOne((type) => User)
    user!: User;
}
