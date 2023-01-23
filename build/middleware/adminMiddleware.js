"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const adminMiddleware = (roles) => {
    return function (req, res, next) {
        var _a;
        if (req.method === "options") {
            next();
        }
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            if (!token) {
                return res.status(403).json({ message: "Only for admins" });
            }
            const { roles: userRoles } = jsonwebtoken_1.default.verify(token, config_1.secret);
            let hasRole = false;
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });
            if (!hasRole) {
                return res.status(403).json({ message: "Only for admins" });
            }
            next();
        }
        catch (err) {
            console.log(err);
            return res.status(403).json({ message: "Only for admins" });
        }
    };
};
exports.adminMiddleware = adminMiddleware;
