const request = require('supertest');
const app = require('../src/app');

describe('Get exercise one right-on-time', () => {
  it('should process succesfully the request', async () => {
    const res = await request(app).get('/api/v1/char');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('get');
  });
});
