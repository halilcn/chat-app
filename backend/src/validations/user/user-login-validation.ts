import joi from 'joi';

import validateMiddleware from '@shared/validate-middleware';

const schema = joi.object().keys({
  username: joi.string().required(),
  password: joi.string().required()
});

export default validateMiddleware(schema);
