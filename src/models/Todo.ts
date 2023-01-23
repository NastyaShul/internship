import mongoose from 'mongoose';
import { Schema } from 'mongoose';

export interface ITodo {
    user: Schema.Types.ObjectId;
    title: string;
    isDone: boolean;
}

export interface ITodoModel extends ITodo, Document {}

const TodoSchema: Schema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        title: { type: String, required: true },
        isDone: { type: Boolean }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<ITodoModel>('Todo', TodoSchema);
