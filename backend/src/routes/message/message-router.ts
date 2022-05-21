import { Router } from 'express';

import auth from '@middlewares/auth';
import messageController from '@controllers/message/message-controller';
import messageStoreValidation from '@validations/message/message-store-validation';
import friendMessagePermission from '@middlewares/permissions/friend-message-permission';
import messageReadController from '@controllers/message/message-read-controller';
import messageReadStoreValidation from '@validations/message/message-read-store-validation';

const router = Router({ mergeParams: true });

router.get('/', auth, friendMessagePermission, messageController.index);
router.post('/', auth, friendMessagePermission, messageStoreValidation, messageController.store);
router.delete('/', auth, friendMessagePermission, messageController.destroy);
router.post('/read', auth, friendMessagePermission, messageReadStoreValidation, messageReadController.store);

export default router;
