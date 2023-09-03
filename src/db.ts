import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Content, Post, User } from './api/models';

const db = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Post, Content],
  synchronize: true,
});

export default db;
