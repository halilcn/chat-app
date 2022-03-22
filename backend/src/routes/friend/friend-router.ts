import { Router } from 'express';

import friendController from '@controllers/friend/friend-controller';
import friendStoreValidation from '@validations/friend/friend-store-validation';

const router = Router();

router.get('/', friendController.index);
router.post('/', friendStoreValidation, friendController.store);

export default router;
