import joi from 'joi';

import validateMiddleware from '@shared/validate-middleware';

const schema = joi.object().keys({
  message: joi.string().required()
});

export default validateMiddleware(schema);
