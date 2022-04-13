import joi from 'joi';

import validateMiddleware from '@shared/validate-middleware';

const schema = joi.object().keys({
  message: joi.string().required(),
  type: joi.string().required().valid('text', 'image')
});

export default validateMiddleware(schema);
