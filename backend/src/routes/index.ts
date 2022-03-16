import { Router } from 'express';

import userActionsRouter from '@routes/user/user-action-router';

const router = Router();

router.use('/v1/user-action/', userActionsRouter);

export default router;
