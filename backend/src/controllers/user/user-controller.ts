import { RequestHandler } from 'express';

const index: RequestHandler = (req, res, nex) => {
  res.send('ok');
};

export default { index };
