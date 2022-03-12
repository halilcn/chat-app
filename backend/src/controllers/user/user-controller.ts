import { RequestHandler } from 'express';

const index: RequestHandler = (req, res, next) => {
  res.send('ok');
};

export default { index };
