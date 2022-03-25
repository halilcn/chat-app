import { Router } from 'express';

import userActionsRouter from '@routes/user/user-action-router';
import friendRouter from '@routes/friend/friend-router';
import messageRouter from '@routes/message/message-router';
import auth from '@middlewares/auth';
import friendMessagePermission from '@middlewares/permissions/friend-message-permission';

const router = Router();

router.use('/v1/user-action/', userActionsRouter);
router.use('/v1/friends/', auth, friendRouter);
router.use('/v1/friends/:friendId/messages/', auth, friendMessagePermission, messageRouter);

export default router;
