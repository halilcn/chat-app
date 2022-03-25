import { Router } from 'express';

import messageController from '@controllers/message/message-controller';
import messageStoreValidation from '@validations/message/message-store-validation';

const router = Router({ mergeParams: true });

//todo: permissions_

router.get('/', messageController.index);
router.post('/', messageStoreValidation, messageController.store);

export default router;
