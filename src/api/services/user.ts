import db from '../../db';
import User, { IUser } from '../models/user';

export default class UserServices {
  static async createUser(user: IUser) {
    try {
      await db
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({ name: user.email, avatar: '', ...user })
        .execute();
    } catch (error) {
      throw error;
    }
  }

  static async getUser(email: string) {
    try {
      return await db.getRepository(User).findOneBy({ email });
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(id: number, user: IUser) {
    try {
      await db
        .createQueryBuilder()
        .update(User)
        .set(user)
        .where('id = :id', { id })
        .execute();
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(id: number) {
    try {
      await db
        .createQueryBuilder()
        .delete()
        .from(User)
        .where('id = :id', { id })
        .execute();
    } catch (error) {
      throw error;
    }
  }
}
