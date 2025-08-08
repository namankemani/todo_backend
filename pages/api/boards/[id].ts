// pages/api/boards/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getUserFromRequest } from '@/lib/middleware';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = getUserFromRequest(req);
    const boardId = req.query.id as string;

    const board = user.boards.find(b => b.id === boardId);
    if (!board) return res.status(404).json({ message: 'Board not found' });

    if (req.method === 'PUT') {
      const { name } = req.body;
      if (!name) return res.status(400).json({ message: 'New name required' });

      board.name = name;
      return res.status(200).json({ board });
    }

    if (req.method === 'DELETE') {
      user.boards = user.boards.filter(b => b.id !== boardId);
      return res.status(200).json({ message: 'Board deleted' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
