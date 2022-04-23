import { Router } from 'express';

import auth from '@middlewares/auth';
import multer from '@shared/multer';
import fileController from '@controllers/file/file-controller';
import fileType from '@middlewares/file/file-type';

const router = Router({ mergeParams: true });

router.post('/', auth, fileType, multer.single('file'), fileController.store);

export default router;
