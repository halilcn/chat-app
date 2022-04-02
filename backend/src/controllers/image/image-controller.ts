import handler from '@shared/handler';
import Friend from '@models/friend-model';
import FriendService from '@services/friend-service';
import response from '@shared/response';

const store = handler(async (req, res, next) => {
  const file = req.file;
  console.log(file);
  next(response.success({ test: file?.path }));
});

const test = handler(async (req, res, next) => {
  res.sendFile(__dirname+'/public/uploads/user-images/test.jpeg');

});

export default {
  store,
  test
};
