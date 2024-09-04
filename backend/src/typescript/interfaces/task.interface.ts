import { Document, ObjectId } from "mongoose";

export interface ITask extends Document {
    _id: ObjectId;
    name: string;
    description: string;
    status: 'pending' | 'completed' | 'on-hold';
    data: string | null;
    time: string | null;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    userId: ObjectId
}