import { createConnection, getRepository } from 'typeorm';
import Record from '../model/Record';
import User from '../model/User';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [User, Record],
    synchronize: true,
})
    .then(async () => {
        const userRepository = getRepository(User);
        const user = userRepository.create({
            login: 'testLogin',
            password: bcrypt.hashSync('testPassword', 7),
        });
        await userRepository.save(user);

        const recordRepository = getRepository(Record);
        for (let i = 0; i < 30; i++) {
            const record = recordRepository.create({
                date: new Date().toString(),
                typeMessage: 'text',
                message: 'test message ' + i,
                user: user,
            });
            await recordRepository.save(record);
        }
    })
    .catch((e) => console.log(e));
