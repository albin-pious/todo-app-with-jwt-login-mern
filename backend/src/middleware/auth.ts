import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export const authMiddleWare = (req: Request, res: Response, next: NextFunction)=>{
    const authHeader = req.headers.authorization;
    console.log('token received ',authHeader);
    
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({ message: 'Unauthorized: No token provided.'});
    }

    const token = authHeader.split(' ')[1]

    const decoded = verifyToken(token);
    if(!decoded){
        return res.status(401).json({ message: 'Unauthorized: Invalid token'});
    }

    req.user = decoded;

    next();
}