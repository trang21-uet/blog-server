import { Router } from 'express';
import { Endpoint } from '../../../constants/endpoint';
import { getPost, getPosts } from '../../controllers/post';

const router = Router();

router.get(Endpoint.POSTS, getPosts);

router.get(Endpoint.POST, getPost);

export default router;
