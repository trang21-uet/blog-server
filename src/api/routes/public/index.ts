import { Router } from 'express';
import postRouter from './post';
import userRouter from './user';
import commentRouter from './comment';

const router = Router();

router.use(userRouter);
router.use(postRouter);
router.use(commentRouter);

export default router;
