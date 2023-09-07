import { CommentQueries } from '../../constants/type';
import db from '../../db';
import { Comment, Post, User } from '../models';

export default class CommentServices {
  static async getComments(queries: CommentQueries) {
    const postId = queries.postId;
    const pageSize = queries.pageSize || 10;
    const pageIndex = queries.pageIndex || 1;
    try {
      const data = await db
        .getRepository(Comment)
        .createQueryBuilder()
        .where('postId = :postId', { postId })
        .getManyAndCount();

      return {
        items: data,
        pageIndex,
        pageSize,
        totalItems: data.length,
        totalPages: Math.ceil(data.length / pageSize),
      };
    } catch (error) {
      throw error;
    }
  }

  static async createComment({
    comment,
    post,
    user,
    username,
  }: {
    comment: string;
    post: Post;
    user: User;
    username: string;
  }) {
    try {
      return await db
        .createQueryBuilder()
        .insert()
        .into(Comment)
        .values({ comment, post, user, username })
        .execute();
    } catch (error) {
      throw error;
    }
  }
}
