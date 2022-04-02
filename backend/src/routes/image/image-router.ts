import { Router } from 'express';

import auth from '@middlewares/auth';
import multer from '@shared/multer';
import imageController from '@controllers/image/image-controller';

const router = Router();

router.post('/', auth, multer.single('image'), imageController.store);

export default router;
