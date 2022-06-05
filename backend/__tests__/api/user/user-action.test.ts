import request from 'supertest';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import server from '../../../src/server';
import User from '@models/user-model';
import setup from '../../test-utils/setup';

describe('User Action', () => {
  setup();

  describe('POST - v1/user-actions/register', () => {
    it('should return 201 with correct user object', async () => {
      const user = {
        username: faker.internet.userName(),
        nameSurname: faker.name.firstName(),
        password: faker.internet.password()
      };

      await request(server).post('/api/v1/user-action/register').send(user).expect(201);
    });

    it('should return 422 with empty correct object', async () => {
      const user = {};

      await request(server).post('/api/v1/user-action/register').send(user).expect(422);
    });
  });

  describe('POST - v1/user-actions/login', () => {
    it('should return 201 with correct user object', async () => {
      const user = {
        username: faker.internet.userName(),
        nameSurname: faker.name.firstName(),
        password: faker.internet.password()
      };

      await User.create({ ...user, password: await bcrypt.hash(user.password, 10) });

      await request(server).post('/api/v1/user-action/login').send({ username: user.username, password: user.password }).expect(201);
    });

    it('should return 422 with empty user object', async () => {
      const user = {};

      await request(server).post('/api/v1/user-action/login').send(user).expect(422);
    });
  });

  describe('POST - v1/user-actions/logout', () => {
    it('should return 200 with correct user object', async () => {
      const user = {
        username: faker.internet.userName(),
        nameSurname: faker.name.firstName(),
        password: faker.internet.password()
      };
      const createdUser = await User.create({ ...user, password: await bcrypt.hash(user.password, 10) });
      const token = jwt.sign({ user_id: createdUser._id }, process.env.JWT_TOKEN_KEY as string);

      await User.findOneAndUpdate({ _id: createdUser._id }, { tokens: [{ token }] });

      await request(server).post('/api/v1/user-action/logout').set('Authorization', token).expect(200);
    });
  });
});
