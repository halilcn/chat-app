import joi from 'joi';

import validateMiddleware from '@shared/validate-middleware';

const schema = joi.object().keys({
  messageIds: joi.array().items(joi.string()).required()
});

export default validateMiddleware(schema);
