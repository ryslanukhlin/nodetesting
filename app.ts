import express from 'express';
import Routers from './Router';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import User from './model/User';
import Record from './model/Record';
import path from 'path';
import swagger from 'swagger-ui-express';
import * as swaggerDocs from './swagger.json';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.static(path.resolve(__dirname + '/static')));
app.use(express.json());
app.use(Routers);
app.use('/api-docs', swagger.serve, swagger.setup(swaggerDocs));

const run = async () => {
    try {
        await createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [User, Record],
            synchronize: true,
        });

        app.listen(8090, () => {
            console.log('server start http://localhost:3000');
        });
    } catch (e) {
        console.log(e);
    }
};

run();
