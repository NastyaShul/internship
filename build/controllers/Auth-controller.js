"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const User_1 = __importDefault(require("../models/User"));
const Role_1 = __importDefault(require("../models/Role"));
const generateAccessToken = (id, roles) => {
    const payload = { id, roles };
    return jsonwebtoken_1.default.sign(payload, config_1.secret, { expiresIn: '24h' });
};
const registration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Error in the registration' });
        }
        const { username, password } = yield req.body;
        const checkCandidate = yield User_1.default.findOne({ username });
        if (checkCandidate) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashPassword = bcrypt_1.default.hashSync(password, 7);
        const userRole = yield Role_1.default.findOne({ value: 'user' });
        const user = new User_1.default({ username, password: hashPassword, roles: [userRole === null || userRole === void 0 ? void 0 : userRole.value] });
        yield user.save();
        return res.json({ message: 'User successfully registered' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield User_1.default.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: `User ${username} is not found` });
        }
        const validPassword = bcrypt_1.default.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Password is not valid' });
        }
        const token = generateAccessToken(user.id, user.roles);
        return res.json({ token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        res.json(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.default.findById(req.params.id).deleteOne();
        // await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
exports.default = {
    registration,
    getUsers,
    login,
    deleteUser,
};
