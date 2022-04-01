import { ObjectId } from 'mongoose';

import User from '@models/user-model';

const update = async (_id: ObjectId, settings: object): Promise<void> => {
  await User.findOneAndUpdate({ _id }, settings);
};

export default {
  update
};
