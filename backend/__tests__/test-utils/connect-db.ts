import mongoose from 'mongoose';

import logger from '@shared/logger';

require('dotenv').config();

export default () => {
  let db;

  mongoose
    .connect(process.env.MONGO_DB_URI as string)
    .then((dbConnect: any) => {
      db = dbConnect;
      logger.info('Connected to mongoDB');
    })
    .catch((err: any) => {
      logger.error(`Mongoose connect error:${err.message}`);
      process.exit(1);
    });

  return db;
};
