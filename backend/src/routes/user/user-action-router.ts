import { Router } from 'express';

import userActionController from '@controllers/user/user-action-controller';
import userRegisterValidation from '@validations/user/user-register-validation';

const router = Router();

router.post('/register', userRegisterValidation, userActionController.register);

export default router;
