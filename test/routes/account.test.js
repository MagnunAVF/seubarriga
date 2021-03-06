const request = require('supertest');
const app = require('../../src/app');

const MAIN_ROUTE = '/accounts';
let user;

beforeAll(async () => {
  const res = await app.services.user.save({ name: 'Walter Mitty', mail: `${Date.now()}@mail.com`, passwd: '123456' })
  user = { ...res[0] }
})

test('Should insert an account with success ', () => {
  return request(app).post(MAIN_ROUTE)
  .send({ name: 'Account #1', user_id: user.id })
  .then((result) => {
    expect(result.status).toBe(201);
    expect(result.body.name).toBe('Account #1');
  });
});

test('Should return all accounts.', () => {
  return app.db('accounts')
    .insert({ name: 'Account list', user_id: user.id })
    .then(() => request(app).get(MAIN_ROUTE))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
  });
});

test('Should return an account based on ID ', () => {
  return app.db('accounts')
    .insert({ name: 'Account by ID', user_id: user.id }, ['id'])
    .then(acc => request(app).get(`${MAIN_ROUTE}/${acc[0].id}`))
    .then(res => {
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Account by ID');
      expect(res.body.user_id).toBe(user.id);
    })
});

test('Should update an account based on ID', () => {
  return app.db('accounts')
    .insert({ name: 'Account to update', user_id: user.id }, ['id'])
    .then(acc =>
      request(app).put(`${MAIN_ROUTE}/${acc[0].id}`)
      .send({ name: 'Account updated' }))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Account updated');
    })
});