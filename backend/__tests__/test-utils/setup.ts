import clearDb from './clear-db';

process.env.MONGO_DB_URI = 'mongodb://localhost:27017/chat-app-test-db';
process.env.JWT_TOKEN_KEY = 'TEST_TOKEN';

export default () => {
  beforeAll(async () => {
    await clearDb();
  });
};
