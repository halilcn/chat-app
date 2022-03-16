import { RequestHandler } from 'express';
import { ObjectSchema } from 'joi';

import response from '@shared/response';

export default (schema: ObjectSchema): RequestHandler =>
  (req, res, next) => {
    const validate = schema.validate(req.body, { abortEarly: false });

    if (validate.error) {
      const processedErrors = validate.error?.details.map(error => {
        return {
          message: error.message,
          context: error.context
        };
      });

      next(response.invalidInput(processedErrors));
    }

    req.validated = validate.value;

    next();
  };
