import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Comment, Content, Post, User } from './api/models';

const db = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Post, Content, Comment],
  synchronize: true,
});

export default db;
