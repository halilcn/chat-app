import { Router } from 'express';

import userSettingController from '@controllers/user/user-setting-controller';
import auth from '@middlewares/auth';
import userSettingsUpdateValidation from '@validations/user/user-settings-update-validation';

const router = Router();

router.get('/', auth, userSettingController.index);
router.put('/', auth, userSettingsUpdateValidation, userSettingController.update);

export default router;
