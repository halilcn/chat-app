import { Router } from 'express';
import friendController from '@controllers/friend/friend-controller';

const router = Router();

router.get('/', friendController.test);
router.post('/', friendController.store);

export default router;
