import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

const connectToDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING as string)
        console.log('Mongodb connected successfully');
        
        mongoose.connection.on('disconnected', ()=>{
            console.log('MongoDB disconnected! Attempting to reconnect...');
            connectToDatabase();
        });
    } catch (error) {
        console.error('MongoDB connection error: ', error);
        process.exit(1);
    }
};

export default connectToDatabase;