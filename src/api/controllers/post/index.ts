import { NextFunction, Request, Response } from 'express';
import { PostServices } from '../../services';

interface PostRequest extends Request {
  brand?: string;
  category?: string;
}

export const getPosts = async (
  req: PostRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await PostServices.getPosts(req.query);
    res.status(200).json(data);
  } catch (error) {
    return error;
  }
};

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await PostServices.getPost(Number(req.params.id));
    res.status(200).json(data);
  } catch (error) {
    return error;
  }
};