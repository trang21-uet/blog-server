import { CommentQueries } from '../../constants/type';
import db from '../../db';
import { Comment } from '../models';

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

  static async getComment(id: number) {
    try {
      return await db.getRepository(Comment).findOneBy({ id });
    } catch (error) {
      throw error;
    }
  }
}
