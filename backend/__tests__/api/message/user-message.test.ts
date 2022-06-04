import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import request from 'supertest';

import User from '@models/user-model';
import Friend from '@models/friend-model';
import Message from '@models/message-model';
import server from '../../../src/server';
import clearDb from '../../test-utils/clear-db';
import connectDb from '../../test-utils/connect-db';

describe('User Message', () => {
  beforeAll(async () => {
    await connectDb();
  });

  beforeEach(async () => {
    await clearDb();
  });

  describe('GET - /v1/user-messages', () => {
    it('should return 200', async () => {
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

      const createdFriend = await Friend.create({ requester: createdUser._id, recipient: createdFriendUser._id });
      await Message.create({
        friendId: createdFriend._id,
        messages: [{ authorId: createdUser._id, type: 'text', content: 'test message', readers: [createdUser._id] }]
      });

      await request(server).get('/api/v1/user-messages').set('Authorization', token).expect(200);
    });

    it('length of response"s messages should be be 1 after create a messages', async () => {
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

      const createdFriend = await Friend.create({ requester: createdUser._id, recipient: createdFriendUser._id });
      await Message.create({
        friendId: createdFriend._id,
        messages: [{ authorId: createdUser._id, type: 'text', content: 'test message', readers: [createdUser._id] }]
      });

      const response = await request(server).get('/api/v1/user-messages').set('Authorization', token).expect(200);

      expect(response.body.data.messages.length).toEqual(1);
    });
  });
});
