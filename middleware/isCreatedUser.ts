import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { userDto } from "../controller/dto/UserDto";
import User from "../model/User";

export const isCreatedUser = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = getRepository(User);
    const { login } = req.body as userDto;
    const user = await userRepository.findOne({ login });
    if(user)
        return res.status(400).json({ error: "такой пользователь уже зарегистрирован"});
    else
        next();
}