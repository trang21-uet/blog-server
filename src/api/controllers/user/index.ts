import { HttpStatusCode } from 'axios';
import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { QueryFailedError } from 'typeorm';
import {
  USER_CREATED,
  USER_REMOVED,
  USER_UPDATED,
  WRONG_ACCOUNT_INFO,
} from '../../../constants/message';
import { UserServices } from '../../services';
import { userSchema } from './helper';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const valid = await userSchema.safeParseAsync(req.body);
    if (!valid.success) {
      const error = {};
      valid.error.errors.forEach(e => (error[e.path[0]] = e.message));
      res.status(HttpStatusCode.BadRequest).json({ error });
      return;
    }
    const { email, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    await UserServices.createUser({ email, password: hash });
    res.status(HttpStatusCode.Created).json({ message: USER_CREATED });
  } catch (error) {
    if (error instanceof QueryFailedError) {
      res.status(HttpStatusCode.BadRequest).json({ error: error.message });
    }
    console.log(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const valid = await userSchema.safeParseAsync(req.body);
    if (!valid.success) {
      const error = {};
      valid.error.errors.forEach(e => (error[e.path[0]] = e.message));
      res.status(HttpStatusCode.BadRequest).json({ error });
      return;
    }
    const { password, ...rest } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    await UserServices.updateUser(Number(id), { password: hash, ...rest });
    res.status(HttpStatusCode.Ok).json({ message: USER_UPDATED });
  } catch (error) {
    if (error instanceof QueryFailedError) {
      res.status(HttpStatusCode.BadRequest).json({ error: error.message });
    }
    console.log(error);
  }
};

export const removeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await UserServices.deleteUser(Number(id));
    res.status(HttpStatusCode.Ok).json({ message: USER_REMOVED });
  } catch (error) {
    if (error instanceof QueryFailedError) {
      res.status(HttpStatusCode.BadRequest).json({ error: error.message });
    }
    console.log(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await UserServices.getUser(email);
    if (!user) {
      res
        .status(HttpStatusCode.Unauthorized)
        .json({ error: WRONG_ACCOUNT_INFO });
      return;
    }
    if (!bcrypt.compareSync(password, user.password)) {
      res
        .status(HttpStatusCode.Unauthorized)
        .json({ error: WRONG_ACCOUNT_INFO });
      return;
    }
    const accessToken = jwt.sign(
      { id: user.id },
      process.env.TOKEN_SECRET!,
      { expiresIn: '10d' }!
    );
    const { name, avatar, id } = user;
    res
      .status(HttpStatusCode.Ok)
      .json({ accessToken, user: { id, name, email, avatar } });
  } catch (error) {
    if (error instanceof QueryFailedError) {
      res.status(HttpStatusCode.BadRequest).json({ error: error.message });
    }
    console.log(error);
  }
};
