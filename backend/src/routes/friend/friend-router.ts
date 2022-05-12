import { Router } from 'express';

import auth from '@middlewares/auth';
import friendController from '@controllers/friend/friend-controller';
import friendStoreValidation from '@validations/friend/friend-store-validation';

const router = Router();

router.get('/search', auth, friendController.search);
router.get('/', auth, friendController.index);
router.post('/', auth, friendStoreValidation, friendController.store);
router.delete('/:friendId', auth, friendController.destroy);
router.get('/:friendId', auth, friendController.show);

export default router;
