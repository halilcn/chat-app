import mongoose from 'mongoose';

import logger from '@shared/logger';

require('dotenv').config();

console.log('okye');

/*
* mongoose
  .connect(process.env.MONGO_DB_URI as string)
  .then(() => {
    logger.info('Connected to mongoDB');
  })
  .catch(err => {
    logger.error('Mongoose connect error:' + err);
    process.exit(1);
  });*/
