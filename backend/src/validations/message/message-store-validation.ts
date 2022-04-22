import joi from 'joi';

import validateMiddleware from '@shared/validate-middleware';
import { MESSAGE_TYPES } from '../../constants';

const schema = joi.object().keys({
  content: joi.string().required(),
  type: joi.string().required().valid(Object.values(MESSAGE_TYPES).join(','))
});

export default validateMiddleware(schema);
