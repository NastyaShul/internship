import mongoose from 'mongoose';
import { Schema } from 'mongoose';

export interface IRole {
    value: string;
}

export interface IRoleModel extends IRole, Document {}

const RoleSchema: Schema = new Schema(
    {
        value: { type: String }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IRoleModel>('Role', RoleSchema);
