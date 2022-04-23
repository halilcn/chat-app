import handler from '@shared/handler';
import response from '@shared/response';

const store = handler(async (req, res, next) => {
  const path = req.file?.path;

  next(response.success({ path }));
});

export default {
  store
};
