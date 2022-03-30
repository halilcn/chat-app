import { Router } from 'express';

import userSettingController from '@controllers/user/user-setting-controller';
import auth from '@middlewares/auth';

const router = Router();

router.get('/', auth, userSettingController.index);

export default router;
