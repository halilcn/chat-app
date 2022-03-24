import { Router } from 'express';

import messageController from '@controllers/message/message-controller';

const router = Router();

//todo: permissions_

router.get('/', messageController.index);

export default router;
