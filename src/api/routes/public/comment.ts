import { Router } from 'express';
import { Endpoint } from '../../../constants/endpoint';
import { getComments } from '../../controllers/comment';

const router = Router();

router.get(Endpoint.COMMENT, getComments);

export default router;
