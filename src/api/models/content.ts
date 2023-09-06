import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Post from './post';

export interface IContent {
  id: number;
  title: string;
  content: string;
  position: number;
  post: number;
}

@Entity('contents')
class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column('text')
  content: string;

  @Column('tinyint')
  position: number;

  @ManyToOne(() => Post, post => post.contents)
  post: Post;
}

export default Content;
