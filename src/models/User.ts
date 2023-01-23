import mongoose from 'mongoose';
import { Schema, Document} from 'mongoose';
import Todo from './Todo';

export interface IUser {
    username: string;
    password: string;
    roles: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        username: { type: String, unique: true, required: true },
        password: { type: String, unique: true, required: true },
        roles: [{ type: String, ref: 'Role' }]
    },
    {
        versionKey: false
    }
);

UserSchema.pre("deleteOne", async function () {
    const {_id} = this.getQuery();
    // @ts-ignore
    this._userId = _id
})

UserSchema.post('deleteOne', async function() {
    // @ts-ignore
    const res = await Todo.deleteMany({user: this._userId});
    console.log(res);
})

export default mongoose.model<IUserModel>('User', UserSchema);


