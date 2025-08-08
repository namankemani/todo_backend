// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { comparePasswords, generateToken } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

  const user = db.users.find(user => user.email === email);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const match = await comparePasswords(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  const token = generateToken(user.id);

  return res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
}
