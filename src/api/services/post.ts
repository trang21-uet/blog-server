import { Like } from 'typeorm';
import { PostQueries } from '../../constants/type';
import db from '../../db';
import { Post } from '../models';

export default class PostServices {
  static async getPosts(queries?: PostQueries) {
    try {
      const search = queries?.search || '';
      const pageSize = queries?.pageSize || 10;
      const pageIndex = queries?.pageIndex || 1;
      const [data, total] = await db.getRepository(Post).findAndCount({
        where: {
          title: Like(`%${search}%`),
        },
        take: pageSize,
        skip: (pageIndex - 1) * pageSize,
      });

      return {
        items: data,
        pageIndex,
        pageSize,
        totalItems: total,
        totalPages: Math.ceil(total / pageSize),
      };
    } catch (error) {
      throw error;
    }
  }

  static async getPost(id: number) {
    try {
      return await db
        .getRepository(Post)
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.contents', 'content')
        .leftJoinAndSelect('post.comments', 'comment')
        .where('post.id = :id', { id })
        .orderBy('content.position')
        .getOne();
    } catch (error) {
      throw error;
    }
  }
}
