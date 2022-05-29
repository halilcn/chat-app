import request from 'supertest';
import server from '../../../src/server';
import { faker } from '@faker-js/faker';
import User from '@models/user-model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as fs from 'fs';
import path from 'path';
import {Blob} from 'node:buffer';
const File = require('fs');

describe('File', () => {
  describe('POST - /v1/file/:fileType', () => {
    test('should return 200 with file', async () => {
      const user = {
        username: faker.internet.userName(),
        nameSurname: faker.name.firstName(),
        password: faker.internet.password()
      };
      const createdUser = await User.create({ ...user, password: await bcrypt.hash(user.password, 10) });
      const token = jwt.sign({ user_id: createdUser._id }, process.env.JWT_TOKEN_KEY as string);

      await User.findOneAndUpdate({ _id: createdUser._id }, { tokens: [{ token }] });

      const dummyImgData = fs.readFileSync(path.join(__dirname, '../../test-utils/test-image.png'));
      const fbParts = [
        new Blob([dummyImgData], {
          type: 'image/jpeg'
        }),
        ' Same way as you do with blob',
        new Uint16Array([999999999999999])
      ];
      const fbImg = new File(fbParts, 'sample.png', {
        type: 'image/jpeg'
      });

      await request(server)
        .post('/v1/file/image')
        .set({ Authorization: token, 'Content-Type': 'multipart/form-data' })
        .send({ file: fbImg })
        .expect(200);
    });
  });
});
