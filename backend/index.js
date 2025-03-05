import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { userRoutes } from './modules/users/routes.js';
import { categoryRoutes } from './modules/categories/routes.js';
import { paymentRoutes } from './modules/payments/routes.js';

dotenv.config();
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const MONGO_URI =
    process.env.MONGO_URI || 'mongodb://mongodb:27017/pirmoney';

const app = express();
const port = process.env.PORT;

connectDB();
app.use(json());
app.use(cors());

// Подключаем все роуты
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', paymentRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
