import { Dayjs } from "dayjs";

export interface Task{
    name: string;
    description: string;
    status: 'pending' | 'completed' | 'on-hold';
    date: Dayjs | null;
    time: Dayjs | null;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
}