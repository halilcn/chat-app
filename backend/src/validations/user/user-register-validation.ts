import joi from 'joi'

import validateMiddleware from '@shared/validate-middleware';

const schema = joi.object()
  .keys({
    name: joi.string()
      .min(3)
      .max(40)
      .required(),
    test:joi.required()
  })


export default validateMiddleware(schema)