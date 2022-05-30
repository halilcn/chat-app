import clearDb from '../../test-utils/clear-db';
import { faker } from '@faker-js/faker';
import User from '@models/user-model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Friend from '@models/friend-model';
import request from 'supertest';
import server from '../../../src/server';

//todo:test name
describe('Friend', () => {
  beforeEach(async () => {
    await clearDb();
  });

  describe('GET - /v1/friends', () => {
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

  describe('POST - /v1/friends', () => {
    it('should return 201', async function () {
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

    it('should return 409', async function () {
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

    it('should return 422', async function () {
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
  });

  describe('GET - /v1/friends/:friendId', () => {
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
});
