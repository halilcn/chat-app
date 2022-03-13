import httpStatusCode from 'http-status-codes';

class CustomError extends Error {
  private code: number;

  constructor(message: string, code: number | undefined = httpStatusCode.BAD_REQUEST) {
    super(message);
    this.code = code;
  }
}

export default CustomError;
