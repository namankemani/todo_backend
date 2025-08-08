// models/User.ts
import mongoose from 'mongoose';
import { unique } from 'next/dist/build/utils';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
},
{ timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
