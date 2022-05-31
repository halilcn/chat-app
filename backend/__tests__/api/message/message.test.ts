import { faker } from '@faker-js/faker';
import User from '@models/user-model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Friend from '@models/friend-model';
import request from 'supertest';
import server from '../../../src/server';
import Message from '@models/message-model';
import clearDb from '../../test-utils/clear-db';
import connectDb from '../../test-utils/connect-db';

describe('Message', () => {
  beforeAll(async () => {
    await connectDb();
  });

  beforeEach(async () => {
    await clearDb();
  });

  describe('GET - /v1/friends/:friendId/messages', () => {
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

      await request(server).get(`/api/v1/friends/${createdFriend._id}/messages`).set('Authorization', token).expect(200);
    });

    it('respo', async () => {
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

      await request(server).get(`/api/v1/friends/${createdFriend._id}/messages`).set('Authorization', token).expect(200);
    });
  });
});
