import mongoose, { Schema } from "mongoose";
import { IUser } from "../typescript/interfaces/user.interface";

const UserSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true},
})

UserSchema.methods.verifyPassword = function (password: string): boolean {
    return this.password === password;
}

const UserModel = mongoose.model<IUser>('User', UserSchema);
export default UserModel;