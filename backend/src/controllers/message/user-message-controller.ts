import handler from '@shared/handler';
import response from '@shared/response';

const index = handler(async (req, res, next) => {
  next(response.success());
});

export default {
  index
};
