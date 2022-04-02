import handler from '@shared/handler';
import Friend from '@models/friend-model';
import FriendService from '@services/friend-service';
import response from '@shared/response';

const store = handler(async (req, res, next) => {
  const file = req.file;
  console.log(file);
  next(response.success({ test: file?.path }));
});

export default {
  store
};
