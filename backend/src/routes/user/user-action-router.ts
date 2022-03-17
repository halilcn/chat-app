import { Router } from 'express';

import userActionController from '@controllers/user/user-action-controller';
import userRegisterValidation from '@validations/user/user-register-validation';
import userLoginValidation from '@validations/user/user-login-validation';

const router = Router();

router.post('/register', userRegisterValidation, userActionController.register);
router.post('/login', userLoginValidation, userActionController.login);

export default router;
