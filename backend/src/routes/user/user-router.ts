import { Router} from 'express';

//todo:alias package json
import userController from '@controllers/user/user-controller';

const router = Router();

router.get('/',userController.index)

export default router;