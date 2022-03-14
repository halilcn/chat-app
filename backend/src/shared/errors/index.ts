import httpStatusCode from 'http-status-codes';

import CustomError from '@shared/errors/custom-error';

export class TestError extends CustomError {
  constructor(message = 'Test error', code = httpStatusCode.GATEWAY_TIMEOUT) {
    super(message, code);
  }
}

export class NotFoundError extends CustomError {
  constructor(message = 'Not Found', code = httpStatusCode.NO_CONTENT) {
    super(message, code);
  }
}

export class AuthenticationError extends CustomError {
  constructor(message = 'Authentication Error', code = httpStatusCode.UNAUTHORIZED) {
    super(message, code);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message = 'Forbidden Error', code = httpStatusCode.FORBIDDEN) {
    super(message, code);
  }
}
