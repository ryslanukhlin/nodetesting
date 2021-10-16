import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import User from '../model/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userDto } from './dto/UserDto';

const register = async (req: Request, res: Response) => {
    try {
        const userRepository = getRepository(User);
        const { login, password } = req.body as userDto;

        const user = userRepository.create({
            login,
            password: bcrypt.hashSync(password, 7),
        });
        await userRepository.save(user);
        return res.sendStatus(201);
    } catch (e) {
        console.log(e);
        return res.sendStatus(503);
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const userRepository = getRepository(User);
        const { login, password } = req.body as userDto;

        const user = await userRepository.findOne({ login });
        if (!user) return res.status(401);
        if (!bcrypt.compareSync(password, user.password)) return res.status(401);

        return res.status(200).send({
            token: jwt.sign({ userId: user.id }, process.env.SECRET_KEY!),
        });
    } catch {
        return res.status(503);
    }
};

export default { register, login };
