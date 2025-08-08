// lib/middleware.ts
import { NextApiRequest } from 'next';
import { verifyToken } from './auth';
import { db } from './db';

export function getUserFromRequest(req: NextApiRequest) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    throw new Error('No token provided');

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  const user = db.users.find(u => u.id === decoded.userId);
  if (!user) throw new Error('User not found');
  return user;
}
