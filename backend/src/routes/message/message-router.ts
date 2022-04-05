import { Router } from 'express';

import messageController from '@controllers/message/message-controller';
import messageStoreValidation from '@validations/message/message-store-validation';
import auth from '@middlewares/auth';
import friendMessagePermission from '@middlewares/permissions/friend-message-permission';

const router = Router({ mergeParams: true });

router.get('/', auth, friendMessagePermission, messageController.index);
router.post('/', auth, friendMessagePermission, messageStoreValidation, messageController.store);

export default router;
