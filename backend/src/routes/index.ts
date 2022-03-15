import { Router } from 'express';

import userRouter from './user/user-router';

const router = Router();

router.use('/v1/users', userRouter);

export default router;
