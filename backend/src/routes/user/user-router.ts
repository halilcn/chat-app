import { Router} from 'express';

import userController from '@controllers/user/user-controller';

const router = Router();

router.get('/',userController.index)

export default router;