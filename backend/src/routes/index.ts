import { Router } from 'express';

import userActionsRouter from '@routes/user/user-action-router';
import friendRouter from '@routes/friend/friend-router';
import messageRouter from '@routes/message/message-router';
import auth from '@middlewares/auth';

const router = Router();

router.use('/v1/user-action/', userActionsRouter);
router.use('/v1/friends/', auth, friendRouter);
router.use('/v1/friends/:friendId/messages/', auth, messageRouter);

export default router;
