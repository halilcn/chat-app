import joi from 'joi';

import validateMiddleware from '@shared/validate-middleware';
import { MESSAGE_TYPES } from '../../constants';

const schema = joi.object().keys({
  messages: joi
    .array()
    .items(
      joi
        .object()
        .keys({
          content: joi.string().required(),
          type: joi
            .string()
            .valid(...Object.values(MESSAGE_TYPES))
            .required()
        })
        .required()
    )
    .required()
});

export default validateMiddleware(schema);
