// pages/api/boards/index.ts (same file as GET)
import { v4 as uuidv4 } from 'uuid';
import { NextApiRequest, NextApiResponse } from 'next';
import { getUserFromRequest } from '@/lib/middleware';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = getUserFromRequest(req);

    if (req.method === 'GET') {
      return res.status(200).json({ boards: user.boards });
    }

    if (req.method === 'POST') {
      const { name } = req.body;
      if (!name) return res.status(400).json({ message: 'Board name required' });

      const newBoard = {
        id: uuidv4(),
        name,
        tasks: [],
      };

      user.boards.push(newBoard);
      return res.status(201).json({ board: newBoard });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
