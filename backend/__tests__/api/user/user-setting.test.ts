import { faker } from '@faker-js/faker';
import User from '@models/user-model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/*describe('User Setting',()=>{
  test('should return 200 - /v1/user-settings/',async ()=>{
    const user = {
      username: faker.internet.userName(),
      nameSurname: faker.name.firstName(),
      password: faker.internet.password()
    };
    const createdUser = await User.create({ ...user, password: await bcrypt.hash(user.password, 10) });
    const token = jwt.sign({ user_id: createdUser._id }, process.env.JWT_TOKEN_KEY as string);

    await User.findOneAndUpdate({ _id: createdUser._id }, { tokens: [{ token }] });
  })
})*/