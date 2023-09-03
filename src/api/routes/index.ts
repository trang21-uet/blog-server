import { Router } from 'express';
import protectedRouter from './protected';
import publicRouter from './public';

const router = Router();

router.use(publicRouter);
router.use(protectedRouter);

export default router;
