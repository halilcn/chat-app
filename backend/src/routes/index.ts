import { Router } from 'express';

import userActionsRouter from '@routes/user/user-action-router';
import friendRouter from '@routes/friend/friend-router';
import auth from '@middlewares/auth';

const router = Router();

router.use('/v1/user-action/', userActionsRouter);
router.use('/v1/friends/', auth,friendRouter);

export default router;
