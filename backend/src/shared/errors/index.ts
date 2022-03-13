import httpStatusCode from 'http-status-codes';

import CustomError from '@shared/errors/custom-error';

export class TestError extends CustomError {
  constructor(message = 'Test error', code = httpStatusCode.BAD_REQUEST) {
    super(message, code);
  }
}
