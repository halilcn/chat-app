import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import request from 'supertest';

import User from '@models/user-model';
import Friend from '@models/friend-model';
import server from '../../../src/server';
import setup from '../../test-utils/setup';

describe('Friend', () => {
  setup();

  describe('GET - /v1/friends', () => {
    it('should return 200 with correct user token', async function () {
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

    it('length of friends should be 1 ', async function () {
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

  describe('POST - /v1/friends', () => {
    it('should return 201 with correct friend user id', async function () {
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

      await request(server).post('/api/v1/friends').set('Authorization', token).send({ recipient: createdFriendUser._id }).expect(201);
    });

    it('should return 409 with same friend user id', async function () {
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

      await request(server).post('/api/v1/friends').set('Authorization', token).send({ recipient: createdFriendUser._id }).expect(409);
    });

    it('should return 422 without friend user id', async function () {
      const user = {
        username: faker.internet.userName(),
        nameSurname: faker.name.firstName(),
        password: faker.internet.password()
      };
      const createdUser = await User.create({ ...user, password: await bcrypt.hash(user.password, 10) });

      const token = jwt.sign({ user_id: createdUser._id }, process.env.JWT_TOKEN_KEY as string);
      await User.findOneAndUpdate({ _id: createdUser._id }, { tokens: [{ token }] });

      await request(server).post('/api/v1/friends').set('Authorization', token).expect(422);
    });

    it('length of friends should be 1 after request to create friend', async function () {
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

      await request(server).post('/api/v1/friends').set('Authorization', token).send({ recipient: createdFriendUser._id });

      const lengthFriends = (await Friend.find().or([{ requester: createdUser._id }, { recipient: createdUser._id }])).length;

      expect(lengthFriends).toEqual(1);
    });
  });

  describe('GET - /v1/friends/:friendId', () => {
    it('should return 200 after create a friend', async function () {
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

      const friend = await Friend.create({ requester: createdUser._id, recipient: createdFriendUser._id });

      await request(server).get(`/api/v1/friends/${friend._id}`).set('Authorization', token).expect(200);
    });

    it('should be defined user in response', async function () {
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

      const friend = await Friend.create({ requester: createdUser._id, recipient: createdFriendUser._id });

      const res = await request(server).get(`/api/v1/friends/${friend._id}`).set('Authorization', token).expect(200);

      expect(res.body.data.user).toBeDefined();
    });
  });

  describe('DELETE - /v1/friends/:friendId', () => {
    it('should return 200', async function () {
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

      const friend = await Friend.create({ requester: createdUser._id, recipient: createdFriendUser._id });

      await request(server).delete(`/api/v1/friends/${friend._id}`).set('Authorization', token).expect(200);
    });

    it('length of friends should be 0 after request to delete friend', async function () {
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

      const friend = await Friend.create({ requester: createdUser._id, recipient: createdFriendUser._id });

      await request(server).delete(`/api/v1/friends/${friend._id}`).set('Authorization', token).expect(200);

      const lengthFriends = (await Friend.find().or([{ requester: createdUser._id }, { recipient: createdUser._id }])).length;

      expect(lengthFriends).toEqual(0);
    });
  });

  describe('GET - /v1/friends/search', () => {
    it('should return 200 after create a friend', async function () {
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

      await request(server).get(`/api/v1/friends/search?value=${friendUser.username}`).set('Authorization', token).expect(200);
    });

    it('length of response"s users should be 1 when request to get users by username', async function () {
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

      const res = await request(server).get(`/api/v1/friends/search?value=${friendUser.username}`).set('Authorization', token);

      expect(res.body.data.users.length).toEqual(1);
    });
  });
});
