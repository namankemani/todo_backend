// models/Task.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  status: "Pending" | "Completed";
  dueDate?: Date;
  createdAt: Date;
  board: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
    dueDate: { type: Date },
    board: { type: Schema.Types.ObjectId, ref: "TaskBoard", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Task = mongoose.models.Task || mongoose.model<ITask>("Task", taskSchema);
