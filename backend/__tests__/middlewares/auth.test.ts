import { NextFunction, Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import jwt from 'jsonwebtoken';

import auth from '@middlewares/auth';
import User from '@models/user-model';
import connectDb from '../test-utils/connect-db';
import clearDb from '../test-utils/clear-db';

describe('Auth Middleware', () => {
  let mockRequest: Partial<Request> = {};
  const mockResponse: Partial<Response> = {};
  const nextFunction: Partial<NextFunction> = jest.fn();

  beforeAll(() => {
    connectDb();
  });

  beforeEach(() => {
    mockRequest = {};
    clearDb();
  });

  describe('should not be user', () => {
    test('without authorization header', async () => {
      await auth(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

      expect(mockRequest.user).not.toBeDefined();
    });

    test('with wrong authorization header', async () => {
      mockRequest = {
        headers: {
          Authorization: 'test-token'
        }
      };

      await auth(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

      expect(mockRequest.user).not.toBeDefined();
    });
  });

  describe('should be user', () => {
    test('with correct authorization header', async () => {
      const user = {
        username: faker.internet.userName(),
        nameSurname: faker.name.firstName(),
        password: faker.internet.password()
      };
      const createdUser = await User.create(user);
      const token = jwt.sign({ user_id: createdUser._id }, process.env.JWT_TOKEN_KEY as string);
      await User.findOneAndUpdate({ _id: createdUser._id }, { tokens: [{ token }] });
      mockRequest = {
        headers: {
          Authorization: token
        }
      };

      await auth(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

      expect(mockRequest.user).toBeDefined();
    });
  });
});
