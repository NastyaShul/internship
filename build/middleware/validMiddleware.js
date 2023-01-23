"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.validationAuthRules = exports.validationTodoRules = void 0;
const express_validator_1 = require("express-validator");
const validationTodoRules = () => {
    return [
        (0, express_validator_1.body)("title", "The field cannot be empty").notEmpty(),
        (0, express_validator_1.body)("isDone", "Boolean only").isBoolean().notEmpty(),
    ];
};
exports.validationTodoRules = validationTodoRules;
const validationAuthRules = () => {
    return [
        (0, express_validator_1.body)("username", "The field cannot be empty").notEmpty(),
        (0, express_validator_1.body)("password", "Password must be 4+ symbols").isLength({ min: 4, max: 10 }),
    ];
};
exports.validationAuthRules = validationAuthRules;
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(400).json({ errors: extractedErrors });
};
exports.validate = validate;
