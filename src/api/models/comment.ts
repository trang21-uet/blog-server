import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './user';
import Post from './post';

export interface IComment {
  id: number;
  title: string;
  content: string;
  position: number;
  post: number;
}

@Entity('comments')
class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.id)
  user: User;

  @ManyToOne(() => Post, post => post.id)
  post: Post;

  @Column('text')
  comment: string;

  @Column({ length: 200 })
  username: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Comment;
