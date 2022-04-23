import handler from '@shared/handler';
import { FILE_TYPES } from '../../constants';
import { FileTypeError } from '@shared/errors';

const auth = handler(async (req, res, next) => {
  if (!Object.values(FILE_TYPES).includes(req.params.fileType)) throw new FileTypeError();

  next();
});

export default auth;
