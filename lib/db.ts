// lib/db.ts

type Task = {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  createdAt: string;
  status: 'pending' | 'completed';
};

type Board = {
  id: string;
  name: string;
  tasks: Task[];
};

type User = {
  id: string;
  name: string;
  email: string;
  password: string; // hashed
  boards: Board[];
};

export const db: {
  users: User[];
} = {
  users: [],
};
