import { Router } from 'express';

import auth from '@middlewares/auth';
import imageController from '@controllers/image/image-controller';
import imageStoreValidation from '@validations/image/image-store-validation';
import multer from '@shared/multer';

const router = Router();

router.post('/', auth, imageStoreValidation, multer.single('image'), imageController.store);

export default router;
