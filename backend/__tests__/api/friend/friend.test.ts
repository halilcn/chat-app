import clearDb from '../../test-utils/clear-db';
import { faker } from '@faker-js/faker';
import User from '@models/user-model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Friend from '@models/friend-model';
import request from 'supertest';
import server from '../../../src/server';

describe('Friend', () => {
  beforeEach(async () => {
    await clearDb();
  });

  describe('GET - /v1/friends', () => {
    it('should return 200 with', async function () {
      const user = {
        username: faker.internet.userName() + '-test-user',
        nameSurname: faker.name.firstName(),
        password: faker.internet.password()
      };
      const friendUser = {
        username: faker.internet.userName() + '-test-friend',
        nameSurname: faker.name.firstName(),
        password: faker.internet.password()
      };
      const createdUser = await User.create({ ...user, password: await bcrypt.hash(user.password, 10) });
      const createdFriendUser = await User.create(friendUser);

      const token = jwt.sign({ user_id: createdUser._id }, process.env.JWT_TOKEN_KEY as string);
      await User.findOneAndUpdate({ _id: createdUser._id }, { tokens: [{ token }] });

      await Friend.create({ requester: createdUser._id, recipient: createdFriendUser._id });

      await request(server).get('/api/v1/friends').set('Authorization', token).expect(200);
    });

    it('should be 1 length of friends ', async function () {
      const user = {
        username: faker.internet.userName() + '-test-user',
        nameSurname: faker.name.firstName(),
        password: faker.internet.password()
      };
      const friendUser = {
        username: faker.internet.userName() + '-test-friend',
        nameSurname: faker.name.firstName(),
        password: faker.internet.password()
      };
      const createdUser = await User.create({ ...user, password: await bcrypt.hash(user.password, 10) });
      const createdFriendUser = await User.create(friendUser);

      const token = jwt.sign({ user_id: createdUser._id }, process.env.JWT_TOKEN_KEY as string);
      await User.findOneAndUpdate({ _id: createdUser._id }, { tokens: [{ token }] });

      await Friend.create({ requester: createdUser._id, recipient: createdFriendUser._id });

      const res = await request(server).get('/api/v1/friends').set('Authorization', token);

      expect(res.body.data).toBeDefined();
      expect(res.body.data.length).toEqual(1);
    });
  });
});
