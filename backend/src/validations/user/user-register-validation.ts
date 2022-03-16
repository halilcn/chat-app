import joi from 'joi';

import validateMiddleware from '@shared/validate-middleware';

//todo:unique
const schema = joi.object().keys({
  username: joi.string().required(),
  nameSurname: joi.string().required(),
  password: joi.string().required()
});

export default validateMiddleware(schema);
