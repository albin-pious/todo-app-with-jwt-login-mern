import { Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    password: string;
    verifyPassword: (password: string) => boolean;
}