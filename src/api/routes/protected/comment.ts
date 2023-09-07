import { Router } from 'express';
import { Endpoint } from '../../../constants/endpoint';
import { addComment, getComments } from '../../controllers/comment';

const router = Router();

router.get(Endpoint.COMMENT, getComments);
router.post(Endpoint.COMMENT, addComment);

export default router;
