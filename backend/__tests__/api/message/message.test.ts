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
import { MESSAGE_TYPES } from '../../../src/constants';

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

    it('should be be messages on body of response after request get', async () => {
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

      const res = await request(server).get(`/api/v1/friends/${createdFriend._id}/messages`).set('Authorization', token).expect(200);

      expect(res.body.data.messages).toBeDefined();
    });
  });

  describe('POST - /v1/friends/:friendId/messages', () => {
    it('should return 201', async () => {
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
      await Message.create({ friendId: createdFriend._id });

      const messages = [
        {
          content: 'test message',
          type: MESSAGE_TYPES.TEXT
        }
      ];

      await request(server)
        .post(`/api/v1/friends/${createdFriend._id}/messages`)
        .set('Authorization', token)
        .send({ messages })
        .expect(201);
    });

    it('should return 422 without messages', async () => {
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

      await request(server).post(`/api/v1/friends/${createdFriend._id}/messages`).set('Authorization', token).expect(422);
    });

    it('should return 422 with missing item of messages', async () => {
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

      const messages = [{ content: 'test-message' }];

      await request(server)
        .post(`/api/v1/friends/${createdFriend._id}/messages`)
        .set('Authorization', token)
        .send({ messages })
        .expect(422);
    });

    it('length of messages should be 1 after post request message', async () => {
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
      await Message.create({ friendId: createdFriend._id });

      const paramsMessages = [
        {
          content: 'test message',
          type: MESSAGE_TYPES.TEXT
        }
      ];

      await request(server)
        .post(`/api/v1/friends/${createdFriend._id}/messages`)
        .set('Authorization', token)
        .send({ messages: paramsMessages });

      const { messages } = await Message.findOne({ friendId: createdFriend._id }).lean();

      expect(messages.length).toEqual(1);
    });
  });

  describe('DELETE - /v1/friends/:friendId/messages', () => {
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

      await request(server).delete(`/api/v1/friends/${createdFriend._id}/messages`).set('Authorization', token).expect(200);
    });

    it('length of messages should be 0 after request to delete messages', async () => {
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

      await request(server).delete(`/api/v1/friends/${createdFriend._id}/messages`).set('Authorization', token);

      const userMessages = (await Message.findOne({ friendId: createdFriend._id }).lean()) as any;

      expect(userMessages.messages.length).toEqual(0);
    });
  });

  describe('POST - /v1/friends/:friendId/messages/read', () => {
    //todo: gerçekten read etmiş mi ?

    it('should return 201', async () => {
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
      const createdMessage = await Message.create({
        friendId: createdFriend._id,
        messages: [{ authorId: createdFriendUser._id, type: 'text', content: 'test message', readers: [createdFriendUser._id] }]
      });

      const messageIds = [createdMessage._id];

      await request(server)
        .post(`/api/v1/friends/${createdFriend._id}/messages/read`)
        .set('Authorization', token)
        .send({ messageIds })
        .expect(201);
    });

    it('should return 422 without message ids', async () => {
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

      await request(server).post(`/api/v1/friends/${createdFriend._id}/messages/read`).set('Authorization', token).expect(422);
    });

    it('readers of message should contain id of user', async () => {
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
      const createdMessage = await Message.create({
        friendId: createdFriend._id,
        messages: [{ authorId: createdFriendUser._id, type: 'text', content: 'test message', readers: [createdFriendUser._id] }]
      });
      const messageIds = [createdMessage._id];

      await request(server).post(`/api/v1/friends/${createdFriend._id}/messages/read`).set('Authorization', token).send({ messageIds });

      const { messages } = await Message.findOne({ friendId: createdFriend._id }).lean();

      console.log(createdUser._id);
      console.log(messages);

      console.log(messages[0].readers); // todo: user'ın kendi id'si olmalıdır
      //todo: readers controllerde problem var !
    });
  });
});
