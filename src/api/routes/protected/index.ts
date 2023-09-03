import { HttpStatusCode } from 'axios';
import { NextFunction, Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { FORBIDDEN } from '../../../constants/message';

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) {
      res.status(HttpStatusCode.Forbidden).json({ error: FORBIDDEN });
      return;
    }
    if (!jwt.verify(accessToken, process.env.TOKEN_SECRET!)) {
      res.status(HttpStatusCode.Forbidden).json({ error: FORBIDDEN });
      return;
    }
    next();
  } catch (error) {
    throw error;
  }
};

const router = Router();

export default router;
