import httpStatusCode from 'http-status-codes';

interface IResponse {
  status: number;
  message?: string | object;
  data?: any;
}

interface ResponseList {
  [key: string]: (message?: string | object, status?: number) => IResponse;
}

const response: ResponseList = {};

response.success = (message = 'Success', status = httpStatusCode.OK) => {
  return typeof message !== 'string'
    ? {
        data: message,
        status
      }
    : {
        message,
        status
      };
};

response.created = (message = 'Created', status = httpStatusCode.CREATED) => {
  return {
    message,
    status
  };
};

response.noContent = (message = 'No Content', status = httpStatusCode.NO_CONTENT) => {
  return {
    message,
    status
  };
};

response.error = (message = 'Error', status = httpStatusCode.BAD_REQUEST) => {
  return {
    message,
    status
  };
};

response.invalidInput = (message = 'Invalid Error', status = httpStatusCode.UNPROCESSABLE_ENTITY) => {
  return typeof message !== 'string'
    ? {
        data: message,
        status
      }
    : {
        message,
        status
      };
};

export default response;
