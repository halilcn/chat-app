import request from 'supertest';
import server from '../../../src/server';

//todo: before each ile ?
//todo: mnogoose test db bağlanma ?
//todo: her test sonrası db temizleme !?

describe('Sample Test', () => {
  it('should test that true === true', async () => {
    await request(server).post('/api/v1/user-action/register').expect(422);
  });
});
