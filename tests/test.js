const request = require('supertest')
const app = require('../server')

describe('Get Status of mqserver', () => {
  it('should retrieve the status', async done => {
    const res = await request(app)
      .get('/')
      .then((res) => {
          expect(res.statusCode).toEqual(200);
          expect(res.body).toHaveProperty('status')
          done();
      });
  });

  it('should echo the request', async done => {
    const res = await request(app)
      .post("/echo/test/test") 
      .then((res) => {
          expect(res.body).toEqual({
          echo_reply: "test"});
          done();
      });
  });

});

