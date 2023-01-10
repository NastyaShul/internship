const {body, validationResult} = require("express-validator");

const validationRules = () => {
    return [
        body("title").notEmpty(),
        body("isDone").isBoolean(),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return next();
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({[err.param]: err.msg}));

    return res.status(400).json({errors: extractedErrors});
}

module.exports = {
    validationRules,
    validate,
}