import joi from 'joi';

import validateMiddleware from '@shared/validate-middleware';

const schema = joi.object().keys({
  image: joi.string().required(),
  nameSurname: joi.string().required()
});

export default validateMiddleware(schema);
