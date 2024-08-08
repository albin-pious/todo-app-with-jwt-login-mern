import { Document, ObjectId } from "mongoose";

export interface IUser extends Document {
    username: string;
    password: string;
    verifyPassword: (password: string) => Promise<boolean>;
    _id: ObjectId; 
}
