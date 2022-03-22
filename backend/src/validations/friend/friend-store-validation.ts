import joi from 'joi';

import validateMiddleware from '@shared/validate-middleware';

const schema = joi.object().keys({
  recipient: joi.string().hex().length(24).required()
});

export default validateMiddleware(schema);
