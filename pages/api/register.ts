// pages/api/register.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { name, email, password } = req.body;

  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

  const existingUser = db.users.find(user => user.email === email);
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashed = await hashPassword(password);

  db.users.push({
    id: uuidv4(),
    name,
    email,
    password: hashed,
    boards: [],
  });

  return res.status(201).json({ message: 'User registered successfully' });
}
