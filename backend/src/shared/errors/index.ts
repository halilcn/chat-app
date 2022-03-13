import CustomError from "./custom-error";
import HttpStatusCodes from 'http-status-codes';

/*
* export class UserRegisterCodeError extends CustomError {
  public static readonly Msg = 'One or more of the required parameters was missing.';
  public static readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;
  constructor() {
    super(ParamMissingError.Msg, ParamMissingError.HttpStatus);
  }


  constructor(message = 'User register code error') {
    super(message);
  }
}*/


export class TestError extends CustomError {
  constructor(message = 'Test error') {
    super(message);
  }
}