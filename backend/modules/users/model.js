import { Schema, model } from 'mongoose';
import { hash } from 'bcrypt';

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Уникальное имя пользователя
        trim: true, // Удаляет пробелы в начале и конце
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Минимальная длина пароля
    },
    createdAt: {
        type: String,
        default: new Date().toISOString, // Дата создания пользователя
    },
    updatedAt: {
        type: String,
        default: new Date().toISOString, // Дата последнего обновления
    },
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await hash(this.password, 10);
    }
    next();
});

export const UserModel = model('User', UserSchema, 'users');
