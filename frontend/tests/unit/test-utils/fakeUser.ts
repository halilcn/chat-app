import axios from 'axios';
import { faker } from '@faker-js/faker';

import testConfig from '../../test-utils/test-config';

export default async () => {
  const registerUser = {
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
    token: loggedInUser.data.token,
    user: user.data.user,
    registerUser
  };
};
