import { NextFunction, Request, Response } from 'express';
import { PostServices } from '../../services';
import db from '../../../db';
import { Post, User } from '../../models';
import CommentServices from '../../services/comment';
import { COMMENT_CREATED } from '../../../constants/message';
import { QueryFailedError } from 'typeorm';
import { HttpStatusCode } from 'axios';

export const getComments = async (
  req: Request,
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

export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { comment, userId } = req.body;
    const { postId } = req.params;
    const post = await db
      .getRepository(Post)
      .findOneBy({ id: postId as unknown as number });
    const user = await db
      .getRepository(User)
      .findOneBy({ id: userId as number });
    const newComment = {
      comment,
      post: post!,
      user: user!,
      username: user?.name!,
    };
    await CommentServices.createComment(newComment);
    res.status(HttpStatusCode.Created).json(newComment);
  } catch (error) {
    if (error instanceof QueryFailedError) {
      res.status(HttpStatusCode.BadRequest).json({ error: error.message });
    }
    console.log(error);
  }
};
