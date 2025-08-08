// models/TaskBoard.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ITaskBoard extends Document {
  title: string;
  user: mongoose.Types.ObjectId;
}

const taskBoardSchema = new Schema<ITaskBoard>(
  {
    title: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const TaskBoard =
  mongoose.models.TaskBoard || mongoose.model<ITaskBoard>("TaskBoard", taskBoardSchema);
