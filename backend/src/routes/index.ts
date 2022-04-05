import { Router } from 'express';

import userActionsRouter from '@routes/user/user-action-router';
import userSettingsRouter from '@routes/user/user-setting-router';
import friendRouter from '@routes/friend/friend-router';
import messageRouter from '@routes/message/message-router';
import userMessageRouter from '@routes/message/user-message-router';
import imageRouter from '@routes/image/image-router';

const router = Router();

router.use('/v1/user-settings', userSettingsRouter);
router.use('/v1/user-action', userActionsRouter);
router.use('/v1/friends', friendRouter);
router.use('/v1/image', imageRouter);
router.use('/v1/friends/:friendId/messages', messageRouter); //auth, friendMessagePermission middlewares
router.use('/v1/user-messages', userMessageRouter);

export default router;
