import request from 'supertest';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

import server from '../../../src/server';
import clearDb from '../../utils/clear-db';
import User from '@models/user-model';

beforeEach(async () => {
  await clearDb();
});

describe('User Action', () => {
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
});
