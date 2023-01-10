const User = require("../models/User");
const Role = require("../models/role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const {validationResult} = require("express-validator");
const {secret} = require("../config");

const generateAccessToken = (id, roles) => {
    const payload = {id, roles};
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

const registration = async (req, res) => {
    try{ 
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message: "Error in the registration"});
        }
        const {username, password} = req.body;
        const candidate = await User.findOne({username});
        if(candidate){
            return res.status(400).json({message: "User already exists"});
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const userRole = await Role.findOne({value: "user"});
        const user = new User({username, password: hashPassword, roles: [userRole.value]});
        await user.save();
        return res.json({message: "User successfully registered"})
    }
    catch(err){
        console.log(err)
        res.status(400).json({err});
    }
}

const login = async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({message: `User ${username} is not found`});
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({message: "Password is not valid"});
        }
        const token = generateAccessToken(user._id, user.roles);
        return res.json({token});
    }
    catch(err){
        console.log(err)
        res.status(400).json({err});
    }
}

const getUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }
    catch(err){
        console.log(err)
        res.status(400).json({err});
    }
}

module.exports = {
    registration,
    login,
    getUsers,
}