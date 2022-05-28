import handler from '@shared/handler';
import Friend from '@models/friend-model';
import { ForbiddenError } from '@shared/errors';

export default handler(async (req, res, next) => {
  const friend = await Friend.findOne({ _id: req.params.friendId });

  if (!friend || (String(friend.requester) != String(req.user._id) && String(friend.recipient) != String(req.user._id)))
    throw new ForbiddenError();

  next();
});
