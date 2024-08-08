import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs';
import { IUser } from "../typescript/interfaces/user.interface";

const UserSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true},
})

UserSchema.methods.verifyPassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model<IUser>('User', UserSchema);
export default User;