import request from 'supertest';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import server from '../../../src/server';
import clearDb from '../../utils/clear-db';
import User from '@models/user-model';

describe('User Action', () => {
  beforeEach(async () => {
    await clearDb();
  });

  it('should return 201 - /register', async () => {
    const user = {
      username: faker.internet.userName(),
      nameSurname: faker.name.firstName(),
      password: faker.internet.password()
    };

    await request(server).post('/api/v1/user-action/register').send(user).expect(201);
  });

  it('should return 201 - /login', async () => {
    const user = {
      username: faker.internet.userName(),
      nameSurname: faker.name.firstName(),
      password: faker.internet.password()
    };

    await User.create({ ...user, password: await bcrypt.hash(user.password, 10) });

    await request(server).post('/api/v1/user-action/login').send({ username: user.username, password: user.password }).expect(201);
  });

  it('should return 200 - /logout', async () => {
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
