import { Router } from 'express';

import userRouter from './user/user-router';

const baseRouter = Router();

baseRouter.use('/users', userRouter);

export default baseRouter;