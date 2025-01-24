import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtSecret } from '../../helpers/constants';

type User = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export function authenticate(
  req: Request,
  res: Response<any, Record<string, any>>,
  next: NextFunction,
): void {
  const token = req.header('Authorization');

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(
      token.replace('Bearer ', ''),
      process.env.JWT_SECRET || JwtSecret,
    ) as User;
    req.user = decoded;
    console.log('Decoded token:', decoded);
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
}
