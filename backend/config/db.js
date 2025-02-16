import mongoose from 'mongoose';
import { MONGO_URI } from '../index.js';

export async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
}
