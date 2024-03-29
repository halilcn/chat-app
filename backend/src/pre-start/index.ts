require('../types/index');

import mongoose from 'mongoose';

import logger from '@shared/logger';

require('dotenv').config();

mongoose
  .connect(process.env.MONGO_DB_URI as string)
  .then(() => {
    logger.info('Connected to mongoDB');
  })
  .catch((err: Error) => {
    logger.error(`Mongoose connect error:${err.message}`);
    process.exit(1);
  });
