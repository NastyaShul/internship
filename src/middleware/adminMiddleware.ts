import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";
import {secret} from "../config";

export const adminMiddleware = (roles: string[]) => {
    return function(req: Request, res: Response, next: NextFunction){
        if(req.method === "options"){
            next();
        }
    
        try{
            interface JwtPayload {
                roles: string[]
              }
            const token = req.headers.authorization?.split(" ")[1];
            if(!token){
                return res.status(403).json({message: "Only for admins"});
            }
            const {roles: userRoles} = jwt.verify(token, secret) as JwtPayload;
            let hasRole = false;
            userRoles.forEach(role => {
                if(roles.includes(role)){
                    hasRole = true;
                }
            });
            if(!hasRole){
                return res.status(403).json({message: "Only for admins"})
            }
            next();
        }
        catch(err){
            console.log(err);
            return res.status(403).json({message: "Only for admins"})
        }
    }
}