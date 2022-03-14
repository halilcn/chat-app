import httpStatusCode from 'http-status-codes';

import CustomError from '@shared/errors/custom-error';

export class TestError extends CustomError {
  constructor(message = 'Test error', code = httpStatusCode.GATEWAY_TIMEOUT) {
    super(message, code);
  }
}
