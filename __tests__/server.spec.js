const request = require('supertest');

const db = require('../database/dbConfig.js');

const server = require('../api/server.js');

describe('server.js', () => {
  // check in test env
  // it('db in testing', () => {
  //   expect(process.env.DB_Env).toBe('testing');
  // });
  afterAll(async () => {
    await db('users').truncate();
  })

  describe('POST /register', () => {

    // check good register
    it('should add user', () => {
      return request(server)
        .post('/api/auth/register/')
        .send({ username: 'Test', password: 'user' })
        .then(res => {
          expect(res.status).toBe(201);
          jsonHeaders(res);
        })
    });
    
    // check wrong register
    it('wrong fields', () => {
      return request(server)
        .post('/api/auth/register')
        .send({ name: 'Joe', password: 'user'})
        .then(res => {
          expect(res.status).toBe(500);
          expect(res.type).toBe('application/json');
        })
    });
  })

  describe('POST /login', () => {

    it('should login', () => {
      return request(server)
        .post('/api/auth/login')
        .send({username: 'Test', password: 'user'})
        .then(res => {
          console.log(res.body);

          jsonHeaders(res);
          expect(res.status).toBe(202);
        })
    });

    it('should fail login', () => {
      return request(server)
        .post('/api/auth/login')
        .send({ username: 'Test', password: 'test'})
        .then(res => {
          expect(res.status).toBe(401);
        })
    })
  })
})

function jsonHeaders(res) {
  return expect(res.type).toBe('application/json')
}