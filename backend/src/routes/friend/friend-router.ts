import { Router } from 'express';
import friendController from '@controllers/friend/friend-controller';

const router = Router();

router.get('/test', friendController.test);

export default router;
