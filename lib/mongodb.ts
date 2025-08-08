// lib/mongodb.ts
import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: 'todo-app',
    });
    isConnected = true;
    console.log('Connected to MongoDB ✅');
  } catch (error) {
    console.error('MongoDB connection error ❌', error);
    throw error;
  }
};
