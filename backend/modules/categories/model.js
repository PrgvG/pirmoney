import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({
    name: { type: String, required: true, trim: true },
    status: { type: String, enum: ['active', 'deleted'], default: 'active' },
    deleted_at: { type: String, default: null },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

export const CategoryModel = model('Category', CategorySchema, 'categories');
