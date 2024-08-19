import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import User from "../models/userModel";
import { generateRefreshToken, generateToken, verifyToken } from "../utils/jwt";
import { IUser } from "../typescript/interfaces/user.interface";

export const checkUsername = async (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({ message: "Username is required." });
        }

        const userExist = await User.findOne({ username });
        if (userExist) {
            return res.status(200).json({ available: false });
        } else {
            return res.status(200).json({ available: true });
        }
    } catch (error) {
        console.error('Error occurred while checking username', error);
        return res.status(500).send('Internal Server Error');
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const userExist = await User.findOne({ username });
        if (userExist) {
            return res.status(400).json({ message: 'Try another username' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();

        return res.status(201).send('User registered');
    } catch (error) {
        console.error('Error registering user', error);
        return res.status(500).send('Error registering user');
    }
};

export const login = async(req: Request, res: Response)=>{
    try {
        const { username, password }= req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = await User.findOne({ username }).exec() as IUser;
        if(user && await user.verifyPassword(password)){
            const userId = user._id.toString();
            const token = generateToken(userId);
            const refreshToken = generateRefreshToken(userId);
            // http only cookies
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV=== 'Production',
                maxAge: 3600000,
                sameSite: 'strict',
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV=== 'Production',
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: 'strict'
            })
            res.json({ message: 'login successfully', userName: user.username });
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send('Error registering user');
    }
}

export const refreshToken = async(req: Request, res: Response)=>{
    try {
        const { refreshToken } = req.body;
        if(!refreshToken) return res.status(401).send('Refresh token required');

        const user = verifyToken(refreshToken);
        if(!user) return res.status(403).send('Invalid refresh token');

        const newToken = generateToken(user.id);
        const newRefreshToken = generateRefreshToken(user.id);

        res.json({ token: newToken, refreshToken: newRefreshToken})
    } catch (error) {
        res.status(500).send('Error registering user');
    }
}