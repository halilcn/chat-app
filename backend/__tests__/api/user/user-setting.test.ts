import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import request from 'supertest';

import User from '@models/user-model';
import server from '../../../src/server';

describe('User Settings', () => {
  describe('GET - /v1/user-settings', () => {
    test('should return 200 with correct user object', async () => {
      const user = {
        username: faker.internet.userName(),
        nameSurname: faker.name.firstName(),
        password: faker.internet.password()
      };
      const createdUser = await User.create({ ...user, password: await bcrypt.hash(user.password, 10) });
      const token = jwt.sign({ user_id: createdUser._id }, process.env.JWT_TOKEN_KEY as string);

      await User.findOneAndUpdate({ _id: createdUser._id }, { tokens: [{ token }] });

      await request(server).get('/api/v1/user-settings').set('Authorization', token).expect(200);
    });
  });

  describe('PUT - /v1/user-settings', () => {
    test('should return 200 with correct new user object', async () => {
      const user = {
        username: faker.internet.userName(),
        nameSurname: faker.name.firstName(),
        password: faker.internet.password()
      };
      const newUser = {
        nameSurname: faker.name.firstName(),
        image: faker.image.imageUrl()
      };
      const createdUser = await User.create({ ...user, password: await bcrypt.hash(user.password, 10) });
      const token = jwt.sign({ user_id: createdUser._id }, process.env.JWT_TOKEN_KEY as string);

      await User.findOneAndUpdate({ _id: createdUser._id }, { tokens: [{ token }] });

      await request(server).put('/api/v1/user-settings').set('Authorization', token).send(newUser).expect(200);
    });

    test('should return 422 with empty new user object', async () => {
      const user = {
        username: faker.internet.userName(),
        nameSurname: faker.name.firstName(),
        password: faker.internet.password()
      };
      const newUser = {};
      const createdUser = await User.create({ ...user, password: await bcrypt.hash(user.password, 10) });
      const token = jwt.sign({ user_id: createdUser._id }, process.env.JWT_TOKEN_KEY as string);

      await User.findOneAndUpdate({ _id: createdUser._id }, { tokens: [{ token }] });

      await request(server).put('/api/v1/user-settings').set('Authorization', token).send(newUser).expect(422);
    });
  });
});
