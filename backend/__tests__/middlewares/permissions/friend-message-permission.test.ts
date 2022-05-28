import { faker } from '@faker-js/faker';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import User from '@models/user-model';
import auth from '@middlewares/auth';
import Friend from '@models/friend-model';
import friendMessagePermission from '@middlewares/permissions/friend-message-permission';
import connectDb from '../../test-utils/connect-db';
import clearDb from '../../test-utils/clear-db';

describe('Friend Message Permission Middleware', () => {
  let mockRequest: Partial<Request> = {};
  const mockResponse: Partial<Response> = {};
  let nextFunction: Partial<NextFunction> = jest.fn();

  beforeAll(() => {
    connectDb();
  });

  beforeEach(async () => {
    mockRequest = {};
    nextFunction = jest.fn();
    await clearDb();
  });

  test('should be no error with correct friend id', async () => {
    let hasErrorCode = false;
    const user = {
      username: faker.internet.userName() + '-test-user',
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

    const friendUser = {
      username: faker.internet.userName() + '-test-friend',
      nameSurname: faker.name.firstName(),
      password: faker.internet.password()
    };
    const createdFriendUser = await User.create(friendUser);

    const createdFriendBetweenUsers = await Friend.create({ requester: createdUser._id, recipient: createdFriendUser._id });
    mockRequest.params = {
      friendId: createdFriendBetweenUsers._id
    };

    nextFunction = (error: any) => {
      if (error && error?.status === 400) hasErrorCode = true;
    };

    await friendMessagePermission(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

    expect(hasErrorCode).toEqual(false);
  });

  test('should be error with wrong friend id', async () => {
    let hasErrorCode = false;
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

    mockRequest.params = {
      friendId: faker.datatype.uuid()
    };

    nextFunction = ({ status }: { status: number }) => {
      if (status === 400) hasErrorCode = true;
    };

    await friendMessagePermission(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

    expect(hasErrorCode).toEqual(true);
  });
});
