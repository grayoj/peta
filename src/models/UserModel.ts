import mongoose, { Document, Model } from 'mongoose';

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel: Model<IUser> = mongoose.model('User', userSchema);
