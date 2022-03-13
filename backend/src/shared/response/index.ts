type messageType = string | object;

interface ResponseList {
  [key: string]: Function;
}

interface Index {
  status: number;
  message?: string | object;
  data?: any;
}

let response: ResponseList = {};

response.success = (message: messageType = 'Success'): Index => {
  const status = 200;

  return typeof message !== 'string'
    ? {
      data: message,
      status,
    }
    : {
      message,
      status
    };
};

response.created = (message: messageType = 'Created'): Index => {
  const status = 201;

  console.log(message);
  return {
    message,
    status
  };
};

response.noContent = (message: messageType = 'No Content'): Index => {
  const status = 204;

  return {
    message,
    status
  };
};

response.error = (message: messageType = 'Error'): Index => {
  const status = 400;

  return {
    message,
    status
  };
};

response.authenticationError = (message: messageType = 'Authentication Error'): Index => {
  const status = 401;

  return {
    message,
    status
  };
};

response.forbiddenError = (message: messageType = 'Forbidden Error'): Index => {
  const status = 403;

  return {
    message,
    status
  };
};

response.notFound = (message: messageType = 'Not Found'): Index => {
  const status = 404;

  return {
    message,
    status
  };
};

response.invalidInput = (message: messageType = 'Invalid Input'): Index => {
  const status = 422;

  return typeof message !== 'string'
    ? {
      data: message,
      status,
    }
    : {
      message,
      status
    };
};

export default response;