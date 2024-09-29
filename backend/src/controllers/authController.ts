import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import User from "../models/userModel";
import { generateRefreshToken, generateToken, verifyToken } from "../utils/jwt";
import { IUser } from "../typescript/interfaces/user.interface";
import logger from "../config/logger";

export const checkUsername = async (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        if (!username) {
            logger.warn('Username is missing in the request body');
            return res.status(400).json({ message: "Username is required." });
        }

        const userExist = await User.findOne({ username });
        if (userExist) {
            logger.info(`Username check: ${username} is already taken`);
            return res.status(200).json({ available: false });
        } else {
            logger.info(`Username check: ${username} is available`);
            return res.status(200).json({ available: true });
        }
    } catch (error) {
        logger.error('Error occurred while checking username', { error });
        return res.status(500).send('Internal Server Error');
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            logger.warn('Username or password missing during registration');
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const userExist = await User.findOne({ username });
        if (userExist) {
            logger.info(`Registration attempt with existing username: ${username}`);
            return res.status(400).json({ message: 'Try another username' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();

        logger.info(`User registered successfully: ${username}`);
        return res.status(201).send('User registered');
    } catch (error) {
        logger.error('Error registering user', { error });
        return res.status(500).send('Error registering user');
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            logger.warn('Username or password missing during login attempt');
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = await User.findOne({ username }).exec() as IUser;

        if (user && await user.verifyPassword(password)) {
            const userId = user._id.toString();
            const token = generateToken(userId);
            const refreshToken = generateRefreshToken(userId);

            logger.info(`User ${username} logged in successfully`);
            return res.json({ 
                message: 'Login successful', 
                userName: user.username,
                token,
                refreshToken
            });
        } else {
            logger.warn(`Invalid login attempt for username: ${username}`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        logger.error('Error occurred during login', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

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