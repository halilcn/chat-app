import express, { Express } from 'express';
import logger from 'morgan';
import helmet from 'helmet';

module.exports = (app: Express): void => {
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(helmet());
};
