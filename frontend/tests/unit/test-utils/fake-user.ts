import axios from 'axios';
import { faker } from '@faker-js/faker';

import testConfig from '../../test-utils/test-config';

export interface IUser {
  _id: string;
  username: string;
  nameSurname: string;
  image: string;
  token: string;
}

export interface IRegisterUser {
  username: string;
  nameSurname: string;
  password: string;
}

export default async () => {
  const registerUser: IRegisterUser = {
    username: faker.internet.userName(),
    nameSurname: faker.name.firstName(),
    password: faker.internet.password()
  };

  await axios.post(`${testConfig.API_URL_V1}user-action/register`, registerUser);

  const loggedInUser = (
    await axios.post(`${testConfig.API_URL_V1}user-action/login`, {
      username: registerUser.username,
      password: registerUser.password
    })
  ).data;

  const user = (await axios.get(`${testConfig.API_URL_V1}user-settings`, { headers: { Authorization: loggedInUser.data.token } })).data;

  return {
    user: { ...user.data.user, token: loggedInUser.data.token },
    registerUser
  };
};
