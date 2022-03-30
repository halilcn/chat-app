import handler from '@shared/handler';
import response from '@shared/response';

const index = handler(async (req, res, next) => {
  const { username, image, nameSurname } = req.user;

  next(response.success({ user: { username, image, nameSurname } }));
});

export default {
  index
};
