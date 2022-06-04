import clearDb from './clear-db';
import disconnectDb from './disconnect-db';
import connectDb from './connect-db';

process.env.MONGO_DB_URI = 'mongodb://localhost:27017/chat-app-test-db';
process.env.JWT_TOKEN_KEY = 'TEST_TOKEN';

//todo:types
export default () => {
  let db: any;

  beforeAll(async () => {
    // db = await connectDb();
  });

  afterAll(async () => {
    //await disconnectDb(db);
  });

  //todo: sıkıntılı
  beforeEach(async () => {
    //await clearDb();
  });
};
