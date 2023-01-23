import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { secret } from '../config';
import User from '../models/User';
import Role from '../models/Role';

const generateAccessToken = (id: string, roles: string) => {
    const payload = { id, roles };
    return jwt.sign(payload, secret, { expiresIn: '24h' });
};

const registration = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Error in the registration' });
        }
        const { username, password } = await req.body;

        const checkCandidate = await User.findOne({ username });
        if (checkCandidate) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const userRole = await Role.findOne({ value: 'user' });
        const user = new User({ username, password: hashPassword, roles: [userRole?.value] });
        await user.save();
        return res.json({ message: 'User successfully registered' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: `User ${username} is not found` });
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Password is not valid' });
        }
        const token = generateAccessToken(user.id, user.roles);
        return res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};

const deleteUser = async (req: Request, res: Response) => {
    try {
        await User.findById(req.params.id).deleteOne();
        // await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "User deleted"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

export default {
    registration,
    getUsers,
    login,
    deleteUser,
};
