import mongoose, { InferSchemaType } from 'mongoose';
import db from '../config/db';

require('dotenv').config;

const userSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.ObjectId, required: true },
  username: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  salt: { type: String, required: true },
});

export type UserType = InferSchemaType<typeof userSchema>;

export const User = db.model('user', userSchema);
