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

export class UsernameAlreadyExistsError extends CustomError {
  constructor(message = 'Username Already Exists Error', code = httpStatusCode.CONFLICT) {
    super(message, code);
  }
}

export class FriendAlreadyExistsError extends CustomError {
  constructor(message = 'Friend Already Exists Error', code = httpStatusCode.CONFLICT) {
    super(message, code);
  }
}

export class NoFriendError extends CustomError {
  constructor(message = 'No Friend Error', code = httpStatusCode.BAD_REQUEST) {
    super(message, code);
  }
}

export class FileTypeError extends CustomError {
  constructor(message = 'File Type Error', code = httpStatusCode.BAD_REQUEST) {
    super(message, code);
  }
}
