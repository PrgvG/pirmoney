import { Schema } from 'mongoose';

export const CommonPaymentSchema = new Schema({
    _id: { type: String, required: true },
    label: { type: String, required: true, trim: true },
    payment_amount: { type: Number, required: true },
    payment_type: { type: String, required: true },
    payment_kind: { type: String, enum: ['income', 'outcome'], required: true },
    completed_at: { type: Date, default: null },
    status: { type: String, enum: ['active', 'deleted'], default: 'active' },
    deleted_at: { type: Date, default: null },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        default: null,
    },
});
