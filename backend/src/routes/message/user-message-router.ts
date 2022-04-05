import { Router } from 'express';

import userMessageController from '@controllers/message/user-message-controller';
import auth from '@middlewares/auth';

const router = Router({ mergeParams: true });

router.get('/', auth, userMessageController.index);

export default router;
