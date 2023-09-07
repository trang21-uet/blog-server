import { Router } from 'express';
import postRouter from './post';
import userRouter from './user';

const router = Router();

router.use(userRouter);
router.use(postRouter);

export default router;
