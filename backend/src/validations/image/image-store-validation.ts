import joi from 'joi';

import validateMiddleware from '@shared/validate-middleware';

const schema = joi.object().keys({
  //image: joi.required()
});

export default validateMiddleware(schema);
