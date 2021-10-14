import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validResult = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    return res.status(401).json({
        errors: errors.array()
    })
}