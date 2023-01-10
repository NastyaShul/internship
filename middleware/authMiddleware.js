const jwt = require("jsonwebtoken");
const {secret} = require("../config");

const authMiddleware = async function(req, res, next){
    if(req.method === "options"){
        next();
    }

    try{
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(403).json({message: "User is not login"})
        }
        const decodeData = jwt.verify(token, secret);
        req.user = decodeData;
        next();
    }
    catch(err){
        console.log(err);
        return res.status(403).json({message: "User is not login"})
    }
};

module.exports = {
    authMiddleware
}