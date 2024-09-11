import { Request, Response } from "express";

export const addTask = (req: Request, res: Response)=>{
    console.log(req.body);
    
}