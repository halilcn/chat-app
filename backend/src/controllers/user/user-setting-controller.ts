import handler from '@shared/handler';
import response from '@shared/response';
import UserSettingService from '@services/user-setting-service';

const index = handler(async (req, res, next) => {
  const { _id, username, image, nameSurname } = req.user;

  next(response.success({ user: { _id, username, image, nameSurname } }));
});

const update = handler(async (req, res, next) => {
  await UserSettingService.update(req.user._id, req.validated);

  next(response.success());
});

export default {
  index,
  update
};
