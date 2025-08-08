import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';

const JWT_SECRET = 'super-secret-key'; // Use env var in production

export function generateToken(userId: string) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as { userId: string };
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function comparePasswords(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

// NEW FUNCTION to get user from the request
// export function getUserFromRequest(req: NextRequest): string | null {
//   const authHeader = req.headers.get('authorization');

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return null;
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = verifyToken(token);
//     return decoded.userId;
//   } catch (error) {
//     console.error('JWT verification failed:', error);
//     return null;
//   }
// }
export const getUserFromRequest = async (req: NextRequest): Promise<string | null> => {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) return null;

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

    return decoded.userId;
  } catch (err) {
    console.error("Error decoding token:", err);
    return null;
  }
};
