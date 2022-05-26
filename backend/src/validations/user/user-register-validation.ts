import joi from 'joi';

import validateMiddleware from '@shared/validate-middleware';
import User from '@models/user-model';

const unique = async (username: string) => {
  const user = await User.exists({ username });
  if (user) throw new Error('This username already exists');
};

const schema = joi.object().keys({
  username: joi.string().required().external(unique),
  nameSurname: joi.string().required(),
  password: joi.string().required()
});

export default validateMiddleware(schema);
