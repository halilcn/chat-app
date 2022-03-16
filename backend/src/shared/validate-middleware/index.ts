import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

import response from '@shared/response';

export default (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const processedErrors = error?.details.map(error => {
      return {
        message: error.message,
        context: error.context
      };
    });

    next(response.invalidInput(processedErrors));
  }

  next();
};
