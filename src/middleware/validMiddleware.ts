import { NextFunction, Request, Response } from 'express';
import {body, validationResult} from "express-validator";

export const validationTodoRules = () => {
    return [
        body("title", "The field cannot be empty").notEmpty(),
        body("isDone", "Boolean only").isBoolean().notEmpty(),
    ]
}

export const validationAuthRules = () => {
    return [
        body("username", "The field cannot be empty").notEmpty(),
        body("password", "Password must be 4+ symbols").isLength({min:4, max:10}),
    ]
}

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return next();
    }

    const extractedErrors: any = [];
    errors.array().map(err => extractedErrors.push({[err.param]: err.msg}));

    return res.status(400).json({errors: extractedErrors});
}