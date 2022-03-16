import User from '@models/user-model';

const createUser = async (user: object): Promise<void> => {
  await User.create(user);
};

export default {
  createUser
};
