import { Router} from 'express';

//todo:alias package json
import userController from '@controllers/user/user-controller';

const router = Router();

//todo:!
router.get('/',userController.test)

export default router;