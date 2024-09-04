import { Schema, Types } from "mongoose";
import { ITask } from "../typescript/interfaces/task.interface";

const taskSchema: Schema<ITask> = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    data: { type: String, required: true },
    time: { type: String, required: true },
    completed: { type: Boolean},
    priority: { type: String},
    userId: { type: Types.ObjectId, required: true, ref: 'User'}
})